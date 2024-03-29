"use client"

import { DelegateeField } from "@/components/form/delegatee-field"
import { config } from "@/components/providers/wagmi-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TransactionFooter } from "@/components/ui/transaction-footer"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { invariant } from "@/lib/assertion"
import { uniStaker } from "@/lib/consts"
import { useTallyDelegatees } from "@/lib/hooks/use-tally-delegatees"
import { invalidateQueries } from "@/lib/machines/actions"
import { hasSignatureNotExpired } from "@/lib/machines/guards"
import { getPermitAndStakeProgress } from "@/lib/machines/permit-and-stake-progress"
import { signGovernanceTokenPermitActor } from "@/lib/machines/sign-governance-token-permit-actor"
import { TxEvent, getTxEvent, waitForTransactionReceiptActor } from "@/lib/machines/wait-for-transaction-receipt"
import { address } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMachine } from "@xstate/react"
import { Info } from "lucide-react"
import React from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits, hexToSignature, parseUnits } from "viem"
import { writeContract } from "wagmi/actions"
import { assertEvent, assign, fromPromise, raise, setup } from "xstate"
import { z } from "zod"

const permitAndStakeMachine = setup({
  actors: {
    sign: signGovernanceTokenPermitActor,
    send: fromPromise(
      async ({
        input: { delegatee, beneficiary, amount, signature, deadline }
      }: {
        input: {
          amount: bigint
          delegatee: Address
          beneficiary: Address
          signature: Hex
          deadline: bigint
        }
      }) => {
        const { v, r, s } = hexToSignature(signature)

        const txHash = await writeContract(config, {
          address: uniStaker,
          abi: abiUniStaker,
          functionName: "permitAndStake",
          args: [amount, delegatee, beneficiary, deadline, Number(v), r, s]
        })
        return txHash
      }
    ),
    waitForTransactionReceipt: waitForTransactionReceiptActor
  },
  actions: {
    invalidateQueries
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
      delegatee: Address
      beneficiary: Address
      txHash: Hex
      client: QueryClient
    }>,
    events: {} as
      | { type: "sign"; amount: bigint; signer: Address; delegatee: Address; beneficiary: Address; client: QueryClient }
      | { type: "resend" }
      | TxEvent
  }
}).createMachine({
  id: "permitAndStake",
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
        input: ({ context: { amount, deadline, signature, delegatee, beneficiary } }) => {
          invariant(
            delegatee !== undefined &&
              signature !== undefined &&
              deadline !== undefined &&
              beneficiary !== undefined &&
              amount !== undefined,
            "Invalid input"
          )
          return { delegatee, beneficiary, amount, signature, deadline }
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
          target: "signed",
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

const formSchema = z
  .object({
    beneficiary: address,
    customDelegatee: address.optional(),
    tallyDelegatee: address.optional(),
    balance: z.bigint(),
    amount: z.string().transform((value, ctx) => {
      const parsedValue = value === "" ? 0n : parseUnits(value, 18)
      if (parsedValue === 0n) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount must be greater than 0"
        })
        return z.NEVER
      }

      return parsedValue
    }),
    delegateeOption: z.enum(["custom", "tally"])
  })
  .transform((value, ctx) => {
    if (value.balance < value.amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount must be less than or equal to balance",
        path: ["amount"]
      })
      return z.NEVER
    }
    if (value.delegateeOption === "tally" && value.tallyDelegatee === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Address required",
        path: ["tallyDelegatee"]
      })
      return z.NEVER
    }

    if (value.delegateeOption === "custom" && value.customDelegatee === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Address required",
        path: ["customDelegatee"]
      })
      return z.NEVER
    }

    return value
  })

const useStakeDialog = ({
  availableForStakingUni,
  account
}: {
  availableForStakingUni: bigint
  account: Address
}) => {
  const client = useQueryClient()
  const [snapshot, send] = useMachine(permitAndStakeMachine)

  const {
    context: { error },
    value: machineState
  } = snapshot

  const progress = getPermitAndStakeProgress(machineState)

  const {
    error: errorTallyDelegatees,
    isLoading: isLoadingTallyDelegatees,
    data: tallyDelegatees
  } = useTallyDelegatees()

  const form = useForm<z.input<typeof formSchema>, any, z.output<typeof formSchema>>({
    defaultValues: {
      beneficiary: account,
      customDelegatee: account,
      tallyDelegatee: undefined,
      amount: formatUnits(availableForStakingUni, 18),
      balance: availableForStakingUni,
      delegateeOption: "custom"
    },
    mode: "onChange",
    resolver: zodResolver(formSchema)
  })

  const { setValue } = form

  const onSubmit = async (values: {
    beneficiary: Address
    customDelegatee?: Address
    tallyDelegatee?: Address
    delegateeOption: "custom" | "tally"
    amount: bigint
  }) => {
    if (machineState === "signed") {
      send({ type: "resend" })
      return
    }
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    invariant(delegatee !== undefined, "Delegatee is not undefined")

    send({
      type: "sign",
      amount: values.amount,
      signer: account,
      delegatee,
      beneficiary: values.beneficiary,
      client
    })
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18), { shouldValidate: true })

  const isFormDisabled = machineState !== "initial"
  const isSubmitButtonEnabled = (machineState === "initial" || machineState === "signed") && form.formState.isValid

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorTallyDelegatees?.message ?? error,
    isFormDisabled,
    setMaxAmount,
    progress,
    tallyDelegatees,
    isLoadingTallyDelegatees,
    isSubmitButtonEnabled
  }
}

export function StakeDialogContent({
  availableForStakingUni,
  account
}: { availableForStakingUni: bigint; account: Address }) {
  const {
    error,
    form,
    isLoadingTallyDelegatees,
    isFormDisabled,
    onSubmit,
    setMaxAmount,
    isSubmitButtonEnabled,
    tallyDelegatees,
    progress
  } = useStakeDialog({
    availableForStakingUni,
    account
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription className="sr-only">
          Enter the amount, fee beneficiary and delegatee to stake
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={(form as UseFormReturn<any>).control}
              name="amount"
              disabled={isFormDisabled}
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
                      disabled={isFormDisabled}
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
            <FormField
              control={(form as UseFormReturn<any>).control}
              name="beneficiary"
              disabled={isFormDisabled}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex flex-row space-x-2">
                            <span>Beneficiary</span>
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            You can assign the fees your staked position earns to any address. The default address is
                            your own.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoadingTallyDelegatees ? (
              "Loading..."
            ) : (
              <DelegateeField
                name="delegateeOption"
                tallyDelegatees={tallyDelegatees ?? []}
                disabled={isFormDisabled}
              />
            )}
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
