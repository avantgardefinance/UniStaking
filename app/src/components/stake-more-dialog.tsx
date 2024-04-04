"use client"

import { useTransactionsManager } from "@/components/providers/transactions-manager-provider"
import { config } from "@/components/providers/wagmi-provider"
import { AddressDisplay } from "@/components/ui/address-display"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TransactionFooter } from "@/components/ui/transaction-footer"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { invariant } from "@/lib/assertion"
import { uniStaker } from "@/lib/consts"
import { hasSignatureNotExpired } from "@/lib/machines/guards"
import { getPermitAndStakeProgress } from "@/lib/machines/permit-and-stake-progress"
import { signGovernanceTokenPermitActor } from "@/lib/machines/sign-governance-token-permit-actor"
import { type TxEvent, getTxEvent, waitForTransactionReceiptActor } from "@/lib/machines/wait-for-transaction-receipt"
import { stakeMoreUnstakeFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMachine } from "@xstate/react"
import { useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits, hexToSignature } from "viem"
import { writeContract } from "wagmi/actions"
import { assertEvent, assign, fromPromise, raise, setup } from "xstate"
import type { z } from "zod"

const permitAndStakeMoreMachine = setup({
  actors: {
    sign: signGovernanceTokenPermitActor,
    send: fromPromise(
      async ({
        input: { stakeId, amount, signature, deadline }
      }: {
        input: {
          amount: bigint
          stakeId: bigint
          signature: Hex
          deadline: bigint
        }
      }) => {
        const { v, r, s } = hexToSignature(signature)

        const txHash = await writeContract(config, {
          address: uniStaker,
          abi: abiUniStaker,
          functionName: "permitAndStakeMore",
          args: [stakeId, amount, deadline, Number(v), r, s]
        })
        return txHash
      }
    ),
    waitForTransactionReceipt: waitForTransactionReceiptActor
  },
  guards: {
    hasSignatureNotExpired: ({ context }) => {
      invariant(context.deadline !== undefined, "Deadline is not undefined")
      return hasSignatureNotExpired(Number(context.deadline))
    }
  },
  types: {
    context: {} as Partial<{
      signature: Hex
      deadline: bigint
      amount: bigint
      error: string
      txHash: Hex
      stakeId: bigint
      monitorTransaction: (txHash: Hex) => void
    }>,
    events: {} as
      | { type: "sign"; stakeId: bigint; amount: bigint; signer: Address; monitorTransaction: (txHash: Hex) => void }
      | { type: "resend" }
      | TxEvent
  }
}).createMachine({
  id: "permitAndMoreStake",
  initial: "initial",
  states: {
    initial: {
      on: {
        sign: {
          target: "signing",
          actions: assign(({ event }) => ({
            ...event,
            error: undefined
          }))
        }
      }
    },
    signing: {
      invoke: {
        id: "sign",
        src: "sign",
        input: ({ event }) => {
          assertEvent(event, "sign")

          return { amount: event.amount, signer: event.signer }
        },
        onDone: {
          target: "sending",
          actions: assign(({ event }) => ({
            signature: event.output.signature,
            deadline: event.output.deadline,
            error: undefined
          }))
        },
        onError: {
          target: "initial",
          actions: assign({ error: "Failed to sign the message" })
        }
      }
    },
    signed: {
      on: {
        resend: [
          {
            target: "sending",
            guard: "hasSignatureNotExpired",
            actions: assign({ error: undefined })
          },
          {
            target: "initial",
            actions: assign({ error: "Signature expired" })
          }
        ]
      }
    },
    sending: {
      invoke: {
        id: "send",
        src: "send",
        input: ({ context: { amount, deadline, signature, stakeId } }) => {
          invariant(
            stakeId !== undefined && signature !== undefined && deadline !== undefined && amount !== undefined,
            "Invalid input"
          )
          return { stakeId, amount, signature, deadline }
        },
        onDone: {
          target: "sent",
          actions: assign(({ event }) => ({ error: undefined, txHash: event.output }))
        },
        onError: {
          target: "signed",
          actions: assign({ error: "Failed to send the message" })
        }
      }
    },
    sent: {
      on: {
        replaceTx: {
          target: "sent",
          actions: assign(({ event }) => ({ txHash: event.txHash }))
        },
        cancelTx: {
          target: "initial",
          actions: assign({ error: "Transaction was cancelled", txHash: undefined })
        },
        confirmTx: {
          target: "confirmed"
        }
      },
      invoke: {
        id: "waitForTransactionReceipt",
        src: "waitForTransactionReceipt",
        input: ({ context: { txHash, monitorTransaction } }) => {
          invariant(monitorTransaction !== undefined, "Monitor transaction is not undefined")
          invariant(txHash !== undefined, "Invalid input")
          monitorTransaction(txHash)
          return txHash
        },
        onDone: {
          actions: raise(
            ({
              event: {
                output: { status, txHash }
              }
            }) => getTxEvent({ status, txHash })
          )
        },
        onError: {
          target: "signed",
          actions: assign({ error: "Failed to send the message" })
        }
      }
    },
    confirmed: {}
  }
})

const useStakeMoreDialog = ({
  availableForStakingUni,
  stakeId,
  account
}: {
  availableForStakingUni: bigint
  stakeId: string
  account: Address
}) => {
  const { monitorTransaction } = useTransactionsManager()
  const [snapshot, send] = useMachine(permitAndStakeMoreMachine)

  const {
    context: { error },
    value: machineState
  } = snapshot

  const progress = getPermitAndStakeProgress(machineState)

  const form = useForm<z.input<typeof stakeMoreUnstakeFormSchema>, any, z.output<typeof stakeMoreUnstakeFormSchema>>({
    defaultValues: {
      amount: formatUnits(availableForStakingUni, 18),
      balance: availableForStakingUni
    },
    mode: "onChange",
    resolver: zodResolver(stakeMoreUnstakeFormSchema)
  })

  const { setValue } = form
  const onSubmit = (values: { amount: bigint }) => {
    if (machineState === "signed") {
      send({ type: "resend" })
      return
    }

    send({
      type: "sign",
      amount: values.amount,
      signer: account,
      stakeId: BigInt(stakeId),
      monitorTransaction
    })
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18), { shouldValidate: true })

  const isFormDisabled = machineState !== "initial"
  const isSubmitButtonEnabled = (machineState === "initial" || machineState === "signed") && form.formState.isValid

  return {
    form,
    isSubmitButtonEnabled,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error,
    isFormDisabled,
    setMaxAmount,
    progress
  }
}

export function StakeMoreDialogContent({
  availableForStakingUni,
  beneficiary,
  delegatee,
  stakeId,
  account
}: {
  availableForStakingUni: bigint
  stakeId: string
  delegatee: Address
  beneficiary: Address
  account: Address
}) {
  const { error, form, isFormDisabled, onSubmit, setMaxAmount, progress, isSubmitButtonEnabled } = useStakeMoreDialog({
    availableForStakingUni,
    stakeId,
    account
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription className="sr-only">Enter the amount to stake</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormField
              disabled={isFormDisabled}
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    You have{" "}
                    <Button
                      variant="link"
                      onClick={(e) => {
                        e.preventDefault()
                        setMaxAmount()
                      }}
                      className="space-x-1 px-0"
                    >
                      <BigIntDisplay value={availableForStakingUni} decimals={18} precision={2} />
                      <span>UNI</span>
                    </Button>{" "}
                    in your balance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                <span>ID</span>
                <span>{stakeId}</span>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Delegatee</span>
                <AddressDisplay value={delegatee} />
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Beneficiary</span>
                <AddressDisplay value={beneficiary} />
              </div>
            </div>

            {error !== undefined && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">{error}</AlertDescription>
              </Alert>
            )}
          </div>
          <TransactionFooter progress={progress} isSubmitButtonEnabled={isSubmitButtonEnabled} />
        </form>
      </Form>
    </DialogContent>
  )
}
