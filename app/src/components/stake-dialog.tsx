"use client"

import { DelegateeField } from "@/components/form/DelegateeField"
import { config } from "@/components/providers/wagmi-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { uniAbi } from "@/lib/abi/uni"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { invariant } from "@/lib/assertion"
import { governanceToken, permitEIP712Options, timeToMakeTransaction, uniStaker } from "@/lib/consts"
import { useTallyDelegatees } from "@/lib/hooks/use-tally-delegatees"
import { useMachine } from "@xstate/react"
import { Download, Info, RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits, hexToSignature, parseUnits } from "viem"
import { readContract, signTypedData, waitForTransactionReceipt, writeContract } from "wagmi/actions"
import { assertEvent, assign, fromPromise, setup } from "xstate"

type Event =
  | { type: "sign"; amount: bigint; signer: Address; delegatee: Address; beneficiary: Address }
  | { type: "resend" }
  | { type: "txReplaced"; txHash: Hex }

const permitAndStakeMachine = setup({
  actors: {
    sign: fromPromise(async ({ input: { signer, amount } }: { input: { signer: Address; amount: bigint } }) => {
      const nonce = await readContract(config, {
        address: governanceToken,
        abi: uniAbi,
        functionName: "nonces",
        args: [signer]
      })

      const deadline = BigInt(Number((new Date().getTime() / 1000).toFixed()) + timeToMakeTransaction)

      const signature = await signTypedData(config, {
        account: signer,
        types: permitEIP712Options.permitTypes,
        domain: {
          ...permitEIP712Options.domainBase,
          chainId: config.state.chainId
        },
        primaryType: permitEIP712Options.primaryType,
        message: {
          owner: signer,
          spender: uniStaker,
          value: amount,
          nonce: nonce,
          deadline
        }
      })

      return {
        signature,
        deadline
      }
    }),
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
    validateSignatureNotExpired: fromPromise(
      async ({
        input: { deadline }
      }: {
        input: {
          deadline: bigint
        }
      }) => {
        return new Date().getTime() / 1000 < Number(deadline)
      }
    ),
    waitForTransactionReceipt: fromPromise(
      async ({
        input: { txHash, send }
      }: {
        input: { txHash: Hex; send: (event: Event) => void }
      }) => {
        await waitForTransactionReceipt(config, {
          hash: txHash,
          onReplaced: ({ transaction }) => {
            send({ type: "txReplaced", txHash: transaction.hash })
          }
        })
      }
    )
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
      replaced: boolean
    }>,
    events: {} as Event
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
            amount: event.amount,
            signer: event.signer,
            delegatee: event.delegatee,
            beneficiary: event.beneficiary,
            error: undefined
          }))
        }
      }
    },
    signing: {
      invoke: {
        id: "sign",
        src: "sign",
        input: ({ context: { amount }, event }) => {
          assertEvent(event, "sign")
          invariant(amount !== undefined, "Amount is not undefined")

          return { amount, signer: event.signer }
        },
        onDone: {
          target: "validateSignatureNotExpired",
          actions: assign(({ event }) => {
            console.log({ eventDeadline: event.output.deadline })
            return {
              signature: event.output.signature,
              deadline: event.output.deadline,
              error: undefined
            }
          })
        },
        onError: {
          target: "signingError",
          actions: assign({ error: "Failed to sing the message" })
        }
      }
    },
    signingError: {
      on: {
        sign: {
          target: "signing",
          actions: assign(({ event }) => ({ amount: event.amount, signer: event.signer, error: undefined }))
        }
      }
    },
    validateSignatureNotExpired: {
      invoke: {
        id: "validateSignatureNotExpired",
        src: "validateSignatureNotExpired",
        input: ({ context: { deadline } }) => {
          console.log({ deadline })
          invariant(deadline !== undefined, "Deadline is not undefined")
          return { deadline }
        },
        onDone: {
          target: "sending"
        },
        onError: {
          target: "signingError",
          actions: assign({ error: "Signature expired", signature: undefined, deadline: undefined })
        }
      }
    },
    signed: {
      on: {
        resend: {
          target: "validateSignatureNotExpired",
          actions: assign({ error: undefined })
        }
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
        txReplaced: {
          target: "sent",
          actions: assign(({ event }) => ({ txHash: event.txHash }))
        }
      },
      invoke: {
        id: "waitForTransactionReceipt",
        src: "waitForTransactionReceipt",
        input: ({ context: { txHash }, self }) => {
          invariant(txHash !== undefined, "Invalid input")
          return { txHash, send: self.send }
        },
        onDone: {
          target: "confirmed"
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

const useStakeDialog = ({
  availableForStakingUni,
  account
}: {
  availableForStakingUni: bigint
  account: Address
}) => {
  const [snapshot, send] = useMachine(permitAndStakeMachine)

  console.log(snapshot)

  const [error, setError] = useState<Error>()
  const {
    error: errorTallyDelegatees,
    isLoading: isLoadingTallyDelegatees,
    data: tallyDelegatees
  } = useTallyDelegatees()

  const form = useForm({
    defaultValues: {
      beneficiary: account,
      customDelegatee: account,
      tallyDelegatee: undefined,
      amount: formatUnits(availableForStakingUni, 18),
      delegateeOption: "custom"
    }
  })

  const { setValue } = form

  const onSubmit = async (values: {
    beneficiary: Address | undefined
    customDelegatee: Address | undefined
    tallyDelegatee: Address | undefined
    delegateeOption: string
    amount: string
  }) => {
    setError(undefined)
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    if (values.beneficiary === undefined || delegatee === undefined) {
      return
    }
    send({
      type: "sign",
      amount: parseUnits(values.amount, 18),
      signer: account,
      delegatee,
      beneficiary: values.beneficiary
    })
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18))

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorTallyDelegatees || error,
    isPending: false,
    setMaxAmount,
    tallyDelegatees,
    isLoadingTallyDelegatees
  }
}

export function StakeDialogContent({
  availableForStakingUni,
  account
}: { availableForStakingUni: bigint; account: Address }) {
  const { error, form, isLoadingTallyDelegatees, isPending, onSubmit, setMaxAmount, tallyDelegatees } = useStakeDialog({
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
            <FormField
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
              <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees ?? []} />
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">{error.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="space-x-2" disabled={isPending}>
              {isPending ? <RotateCw size={16} className="mr-2 size-4 animate-spin" /> : <Download size={16} />}

              <span>Permit & Stake</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
