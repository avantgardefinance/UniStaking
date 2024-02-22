"use client"

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
import { invalidateQueries } from "@/lib/machines/actions"
import { getTransactionProgress } from "@/lib/machines/transaction-progress"
import { TxEvent, getTxEvent, waitForTransactionReceiptActor } from "@/lib/machines/wait-for-transaction-receipt"
import { stakeMoreUnstakeFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMachine } from "@xstate/react"
import { Upload } from "lucide-react"
import { UseFormReturn, useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits } from "viem"
import { writeContract } from "wagmi/actions"
import { assign, fromPromise, raise, setup } from "xstate"
import { z } from "zod"

const unstakeMachine = setup({
  actors: {
    send: fromPromise(
      async ({
        input: { stakeId, amount }
      }: {
        input: {
          amount: bigint
          stakeId: bigint
        }
      }) => {
        const txHash = await writeContract(config, {
          address: uniStaker,
          abi: abiUniStaker,
          functionName: "withdraw",
          args: [stakeId, amount]
        })

        return txHash
      }
    ),
    waitForTransactionReceipt: waitForTransactionReceiptActor
  },
  actions: {
    invalidateQueries
  },
  types: {
    context: {} as Partial<{
      amount: bigint
      error: string
      txHash: Hex
      stakeId: bigint
      client: QueryClient
    }>,
    events: {} as { type: "send"; stakeId: bigint; amount: bigint; client: QueryClient } | TxEvent
  }
}).createMachine({
  id: "unstake",
  initial: "initial",
  states: {
    initial: {
      on: {
        send: {
          target: "sending",
          actions: assign(({ event }) => ({
            ...event,
            error: undefined
          }))
        }
      }
    },
    sending: {
      invoke: {
        id: "send",
        src: "send",
        input: ({ context: { amount, stakeId } }) => {
          invariant(stakeId !== undefined && amount !== undefined, "Invalid input")
          return { stakeId, amount }
        },
        onDone: {
          target: "sent",
          actions: assign(({ event }) => ({ error: undefined, txHash: event.output }))
        },
        onError: {
          target: "initial",
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
        input: ({ context: { txHash } }) => {
          invariant(txHash !== undefined, "Invalid input")
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
          target: "initial",
          actions: assign({ error: "Failed to send the message" })
        }
      }
    },
    confirmed: {
      entry: [
        {
          type: "invalidateQueries",
          params: ({ context }) => {
            invariant(context.client !== undefined, "Client is not undefined")
            return context.client
          }
        }
      ]
    }
  }
})

const useUnstakeDialog = ({ availableForUnstaking, stakeId }: { stakeId: string; availableForUnstaking: bigint }) => {
  const client = useQueryClient()
  const [snapshot, send] = useMachine(unstakeMachine)

  const {
    context: { error },
    value: machineState
  } = snapshot

  const progress = getTransactionProgress({
    machineState,
    initialButtonContent: (
      <>
        <Upload size={16} />
        <span>Unstake</span>
      </>
    )
  })

  const form = useForm<z.input<typeof stakeMoreUnstakeFormSchema>, any, z.output<typeof stakeMoreUnstakeFormSchema>>({
    defaultValues: {
      amount: formatUnits(availableForUnstaking, 18),
      balance: availableForUnstaking
    },
    mode: "onChange",
    resolver: zodResolver(stakeMoreUnstakeFormSchema)
  })

  const { setValue } = form

  const onSubmit = (values: {
    amount: bigint
  }) => {
    send({
      type: "send",
      amount: values.amount,
      stakeId: BigInt(stakeId),
      client
    })
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForUnstaking, 18), { shouldValidate: true })

  const isFormDisabled = machineState !== "initial"
  const isSubmitButtonEnabled = machineState === "initial" && form.formState.isValid

  return {
    form,
    isFormDisabled,
    isSubmitButtonEnabled,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error,
    progress,
    setMaxAmount
  }
}

export function UnstakeDialogContent({
  availableForUnstaking,
  beneficiary,
  delegatee,
  stakeId
}: {
  availableForUnstaking: bigint
  stakeId: string
  delegatee: Address
  beneficiary: Address
}) {
  const { error, form, isFormDisabled, progress, onSubmit, setMaxAmount, isSubmitButtonEnabled } = useUnstakeDialog({
    availableForUnstaking,
    stakeId
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Unstake</DialogTitle>
        <DialogDescription className="sr-only">Enter the amount to unstake</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormField
              disabled={isFormDisabled}
              control={(form as UseFormReturn<any>).control}
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
                      <BigIntDisplay value={availableForUnstaking} decimals={18} precision={2} />
                      <span>UNI</span>
                    </Button>{" "}
                    to unstake
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
