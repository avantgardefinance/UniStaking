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
import type { Address } from "viem"
import { formatUnits, hexToSignature, parseUnits } from "viem"
import { useChainId } from "wagmi"
import { readContract, signTypedData } from "wagmi/actions"

const useStakeDialog = ({
  availableForStakingUni,
  account
}: {
  availableForStakingUni: bigint
  account: Address
}) => {
  const chainId = useChainId()

  const [error, setError] = useState<Error>()

  const { error: errorTallyDelegatees, isLoading: isLoadingTallyDelegatees, tallyDelegatees } = useTallyDelegates()

  const { error: errorWrite, isPending: isPendingWrite, writeContract } = useWriteContractWithToast()

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

    try {
      const nonce = await readContract(config, {
        address: governanceToken,
        abi: uniAbi,
        functionName: "nonces",
        args: [account]
      })

      const signedDeadline = BigInt(Number((new Date().getTime() / 1000).toFixed()) + timeToMakeTransaction)

      const value = parseUnits(values.amount, 18)

      const permitSignature = await signTypedData(config, {
        account,
        types: permitEIP712Options.permitTypes,
        domain: {
          ...permitEIP712Options.domainBase,
          chainId: chainId
        },
        primaryType: permitEIP712Options.primaryType,
        message: {
          owner: account,
          spender: uniStaker,
          value,
          nonce: nonce,
          deadline: signedDeadline
        }
      })

      const { v, r, s } = hexToSignature(permitSignature)

      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "permitAndStake",
        args: [parseUnits(values.amount, 18), delegatee, values.beneficiary, signedDeadline, Number(v), r, s]
      })
    } catch (e) {
      if (e instanceof Error) {
        setError(e)
      } else {
        setError(new Error("Something went wrong"))
      }
    }
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18))

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorWrite || errorTallyDelegatees || error,
    isPending: isPendingWrite,
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
              <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees} />
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
