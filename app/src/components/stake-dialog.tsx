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
import { governanceToken, permitEIP712Options, timeToMakeTransaction, uniStaker } from "@/lib/consts"
import { useTallyDelegates } from "@/lib/hooks/use-tally-delegates"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { Download, Info, RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits, hexToSignature, isAddressEqual, parseUnits } from "viem"
import { useAccount, useChainId } from "wagmi"
import { readContract, signTypedData } from "wagmi/actions"

const useStakeDialog = ({
  availableForStakingUni
}: {
  availableForStakingUni: bigint
}) => {
  const account = useAccount()
  const chainId = useChainId()

  const [signatureInfo, setSignatureInfo] = useState<{
    signature: Hex
    deadline: bigint
    owner: Address
    value: bigint
  }>()
  const [error, setError] = useState<Error>()

  const { error: errorTallyDelegatees, isLoading: isLoadingTallyDelegatees, tallyDelegatees } = useTallyDelegates()

  const { error: errorWrite, isPending: isPendingWrite, writeContract } = useWriteContractWithToast()

  const form = useForm({
    defaultValues: {
      beneficiary: account.address,
      customDelegatee: account.address,
      tallyDelegatee: undefined,
      amount: formatUnits(availableForStakingUni, 18),
      delegateeOption: "custom"
    }
  })

  const { setValue, watch } = form

  const [amount] = watch(["amount"])

  const hasSignedEnoughValue = signatureInfo !== undefined && parseUnits(amount, 18) <= signatureInfo.value

  const onSubmit = async (values: {
    beneficiary: Address | undefined
    customDelegatee: Address | undefined
    tallyDelegatee: Address | undefined
    delegateeOption: string
    amount: string
  }) => {
    setError(undefined)
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    if (values.beneficiary === undefined || delegatee === undefined || account.address === undefined) {
      return
    }

    if (hasSignedEnoughValue) {
      const deadlineTimestamp = Number(signatureInfo.deadline) * 1000
      if (deadlineTimestamp < new Date().getTime()) {
        setSignatureInfo(undefined)
        setError(new Error("Singature expired"))
        return
      }
      if (!isAddressEqual(signatureInfo.owner, account.address)) {
        setSignatureInfo(undefined)
        setError(new Error("Invalid signature owner"))
        return
      }

      const { v, r, s } = hexToSignature(signatureInfo.signature)
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "permitAndStake",
        args: [parseUnits(values.amount, 18), delegatee, values.beneficiary, signatureInfo.deadline, Number(v), r, s]
      })
    } else {
      try {
        const nonce = await readContract(config, {
          address: governanceToken,
          abi: uniAbi,
          functionName: "nonces",
          args: [account.address]
        })

        const signedDeadline = BigInt(Number((new Date().getTime() / 1000).toFixed()) + timeToMakeTransaction)

        const value = parseUnits(values.amount, 18)

        const permitSignature = await signTypedData(config, {
          account: account.address,
          types: {
            [permitEIP712Options.primaryType]: permitEIP712Options.permitTypes
          },
          domain: {
            ...permitEIP712Options.domainBase,
            chainId: chainId
          },
          primaryType: permitEIP712Options.primaryType,
          message: {
            owner: account.address,
            spender: uniStaker,
            value,
            nonce: nonce,
            deadline: signedDeadline
          }
        })

        setSignatureInfo({
          signature: permitSignature,
          deadline: signedDeadline,
          owner: account.address,
          value
        })
      } catch (e) {
        if (e instanceof Error) {
          setError(e)
        } else {
          setError(new Error("Something went wrong"))
        }
      }
    }
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18))

  return {
    form,
    hasSignedEnoughValue,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorWrite || errorTallyDelegatees || error,
    isPending: isPendingWrite,
    setMaxAmount,
    tallyDelegatees,
    isLoadingTallyDelegatees
  }
}

export function StakeDialogContent({ availableForStakingUni }: { availableForStakingUni: bigint }) {
  const {
    error,
    form,
    isLoadingTallyDelegatees,
    isPending,
    onSubmit,
    setMaxAmount,
    tallyDelegatees,
    hasSignedEnoughValue
  } = useStakeDialog({
    availableForStakingUni
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
              <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees} />
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">{error.message}</AlertDescription>
              </Alert>
            )}
            {hasSignedEnoughValue ? null : (
              <Alert>
                <AlertDescription>
                  You didn&apos;t permit enough value to stake this amount. Please permit first.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="space-x-2" disabled={isPending}>
              {isPending ? (
                <RotateCw size={16} className="mr-2 size-4 animate-spin" />
              ) : hasSignedEnoughValue ? (
                <Download size={16} />
              ) : null}

              {hasSignedEnoughValue ? <span>Stake</span> : <span>Permit</span>}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
