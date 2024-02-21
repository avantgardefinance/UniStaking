"use client"

import { TallyDelegatee } from "@/app/api/delegatees/model"
import { DelegateeField } from "@/components/form/DelegateeField"
import { config } from "@/components/providers/wagmi-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TransactionFooter } from "@/components/ui/transaction-footer"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { invariant } from "@/lib/assertion"
import { uniStaker } from "@/lib/consts"
import { useTallyDelegatees } from "@/lib/hooks/use-tally-delegatees"
import { invalidateQueries } from "@/lib/machines/actions"
import { getTransactionProgress } from "@/lib/machines/transaction-progress"
import { TxEvent, getTxEvent, waitForTransactionReceiptActor } from "@/lib/machines/wait-for-transaction-receipt"
import { address } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMachine } from "@xstate/react"
import { Info } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { encodeFunctionData, isAddressEqual } from "viem"
import { writeContract } from "wagmi/actions"
import { assign, fromPromise, raise, setup } from "xstate"
import { z } from "zod"

const editBeneficiaryDelegateeMachine = setup({
  actors: {
    send: fromPromise(
      async ({
        input: { stakeId, beneficiary, delegatee, currentBeneficiary, currentDelegatee }
      }: {
        input: {
          stakeId: bigint
          beneficiary: Address
          delegatee: Address
          currentBeneficiary: Address
          currentDelegatee: Address
        }
      }) => {
        if (isAddressEqual(beneficiary, currentBeneficiary)) {
          return await writeContract(config, {
            address: uniStaker,
            abi: abiUniStaker,
            functionName: "alterDelegatee",
            args: [BigInt(stakeId), delegatee]
          })
        }

        if (isAddressEqual(delegatee, currentDelegatee)) {
          return await writeContract(config, {
            address: uniStaker,
            abi: abiUniStaker,
            functionName: "alterBeneficiary",
            args: [BigInt(stakeId), beneficiary]
          })
        }

        const encodedDataAlterDelegatee = encodeFunctionData({
          abi: abiUniStaker,
          functionName: "alterDelegatee",
          args: [BigInt(stakeId), delegatee]
        })
        const encodedDataAlterBeneficiary = encodeFunctionData({
          abi: abiUniStaker,
          functionName: "alterBeneficiary",
          args: [BigInt(stakeId), beneficiary]
        })

        return await writeContract(config, {
          address: uniStaker,
          abi: abiUniStaker,
          functionName: "multicall",
          args: [[encodedDataAlterDelegatee, encodedDataAlterBeneficiary]]
        })
      }
    ),
    waitForTransactionReceipt: waitForTransactionReceiptActor
  },
  actions: {
    invalidateQueries
  },
  types: {
    context: {} as Partial<{
      delegatee: Address
      beneficiary: Address
      currentBeneficiary: Address
      currentDelegatee: Address
      account: Address
      error: string
      txHash: Hex
      stakeId: bigint
      client: QueryClient
    }>,
    events: {} as
      | {
          type: "send"
          stakeId: bigint
          delegatee: Address
          beneficiary: Address
          currentBeneficiary: Address
          currentDelegatee: Address
          client: QueryClient
        }
      | TxEvent
  }
}).createMachine({
  id: "editBeneficiaryDelegatee",
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
        input: ({ context: { stakeId, delegatee, currentBeneficiary, beneficiary, currentDelegatee } }) => {
          invariant(
            stakeId !== undefined &&
              delegatee !== undefined &&
              beneficiary !== undefined &&
              currentBeneficiary !== undefined &&
              currentDelegatee !== undefined,
            "Invalid input"
          )
          return { stakeId, delegatee, beneficiary, currentBeneficiary, currentDelegatee }
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

export function EditBeneficiaryDelegateeDialogContent({
  beneficiary,
  delegatee,
  stakeId
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
}) {
  const { error, isLoading, data } = useTallyDelegatees()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit beneficiary and delegatee</DialogTitle>
      </DialogHeader>
      {isLoading ? (
        "Loading..."
      ) : (
        <EditBeneficiaryDelegateeForm
          tallyDelegatees={data ?? []}
          beneficiary={beneficiary}
          delegatee={delegatee}
          stakeId={stakeId}
          tallyDelegateesError={error}
        />
      )}
    </DialogContent>
  )
}

const formSchema = z
  .object({
    beneficiary: address,
    currentBeneficiary: address,
    customDelegatee: address.optional(),
    currentDelegatee: address,
    tallyDelegatee: address.optional(),
    delegateeOption: z.enum(["custom", "tally"])
  })
  .transform((value, ctx) => {
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

    const delegatee = value.delegateeOption === "tally" ? value.tallyDelegatee : value.customDelegatee

    invariant(delegatee !== undefined, "Delegatee is not undefined")

    if (
      isAddressEqual(value.beneficiary, value.currentBeneficiary) &&
      isAddressEqual(value.currentDelegatee, delegatee)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Both beneficiary and delegatee are the same as the current ones",
        path: ["beneficiary"]
      })
      return z.NEVER
    }

    return value
  })

const useEditBeneficiaryDelegateeForm = ({
  beneficiary: currentBeneficiary,
  delegatee: currentDelegatee,
  stakeId,
  tallyDelegatees,
  tallyDelegateesError
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
  tallyDelegatees: ReadonlyArray<TallyDelegatee>
  tallyDelegateesError: Error | null
}) => {
  const client = useQueryClient()
  const [snapshot, send] = useMachine(editBeneficiaryDelegateeMachine)

  const {
    context: { error },
    value: machineState
  } = snapshot

  const progress = getTransactionProgress({
    machineState,
    initialButtonContent: <span>Send</span>
  })

  const tallyDelegatee = tallyDelegatees.find((delegatee) => isAddressEqual(delegatee.address, currentDelegatee))

  const form = useForm<z.input<typeof formSchema>, any, z.output<typeof formSchema>>({
    defaultValues: {
      beneficiary: currentBeneficiary,
      customDelegatee: currentDelegatee,
      currentBeneficiary,
      currentDelegatee,
      tallyDelegatee: tallyDelegatee?.address,
      delegateeOption: tallyDelegatee === undefined ? "custom" : "tally"
    },
    mode: "onChange",
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: {
    beneficiary: Address
    customDelegatee?: Address
    tallyDelegatee?: Address
    currentBeneficiary: Address
    currentDelegatee: Address
    delegateeOption: "custom" | "tally"
  }) => {
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    invariant(delegatee !== undefined, "Delegatee is not undefined")

    send({
      type: "send",
      stakeId: BigInt(stakeId),
      beneficiary: values.beneficiary,
      delegatee,
      currentBeneficiary: values.currentBeneficiary,
      currentDelegatee: values.currentDelegatee,
      client
    })
  }

  const isFormDisabled = machineState !== "initial"
  const isSubmitButtonEnabled = machineState === "initial" && form.formState.isValid

  return {
    form,
    isFormDisabled,
    isSubmitButtonEnabled,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: error ?? tallyDelegateesError?.message,
    progress
  }
}

function EditBeneficiaryDelegateeForm({
  beneficiary,
  delegatee,
  stakeId,
  tallyDelegatees,
  tallyDelegateesError
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
  tallyDelegatees: ReadonlyArray<TallyDelegatee>
  tallyDelegateesError: Error | null
}) {
  const { error, form, isFormDisabled, onSubmit, progress, isSubmitButtonEnabled } = useEditBeneficiaryDelegateeForm({
    beneficiary,
    delegatee,
    stakeId,
    tallyDelegatees,
    tallyDelegateesError
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <span>ID</span>
          <span>{stakeId}</span>
        </div>
        <Separator />
        <div className="space-y-4">
          <FormField
            disabled={isFormDisabled}
            control={form.control}
            name="beneficiary"
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
                          You can assign the fees your staked position earns to any address. The default address is your
                          own.
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
          <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees} disabled={isFormDisabled} />
          {error !== undefined && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="break-all">{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <TransactionFooter progress={progress} isSubmitButtonEnabled={isSubmitButtonEnabled} />
      </form>
    </FormProvider>
  )
}
