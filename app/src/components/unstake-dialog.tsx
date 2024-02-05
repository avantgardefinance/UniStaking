"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { abi as abiIERC20 } from "@/lib/abi/IERC20"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { governanceToken, uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { Download, RotateCw } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useReadContract } from "wagmi"

const useUnstakeDialog = ({ availableForUnstaking }: { availableForUnstaking: bigint }) => {
  const account = useAccount()
  const {
    error: errorWrite,
    isPending: isPendingWrite,
    writeContract
  } = useWriteContractWithToast()

  const form = useForm({
    defaultValues: {
      amount: formatUnits(availableForUnstaking, 18)
    }
  })

  const { setValue } = form

  const onSubmit = useCallback(async (values: {
    beneficiary: Address | undefined
    delegatee: Address | undefined
    amount: string
  }) => {
    if (values.beneficiary === undefined || values.delegatee === undefined) {
      return
    }

    if (hasEnoughAllowance) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "stake",
        args: [parseUnits(values.amount, 18), values.delegatee, values.beneficiary]
      })
    } else {
      writeContract({
        address: governanceToken,
        abi: abiIERC20,
        functionName: "approve",
        args: [uniStaker, parseUnits(values.amount, 18)]
      })
    }
  }, [hasEnoughAllowance, writeContract])

  const setMaxAmount = useCallback(() => {
    setValue("amount", formatUnits(availableForUnstaking, 18))
  }, [availableForStakingUni, setValue])

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    hasEnoughAllowance,
    error: errorWrite,
    isPending: isPendingWrite,
    setMaxAmount
  }
}

export function UnstakeDialogContent(
  { availableForUnstaking, beneficiary, delegatee, stakeID }: {
    availableForUnstaking: bigint
    stakeID: number
    delegatee: Address
    beneficiary: Address
  }
) {
  const { error, form, hasEnoughAllowance, isPending, onSubmit, setMaxAmount } = useUnstakeDialog({
    availableForStakingUni
  })

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Unstake</DialogTitle>
        <DialogDescription className="sr-only">
          Enter the amount to unstake
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
                      <BigIntDisplay value={availableForUnstaking} decimals={18} />
                      <span>UNI</span>
                    </Button>{" "}
                    to unstake
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <span>Delegatee</span>
              <span>{delegatee}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Beneficiary</span>
              <span>{beneficiary}</span>
            </div>
            {error &&
              (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="break-all">
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}
            {hasEnoughAllowance ? null : (
              <Alert>
                <AlertDescription>
                  You don&apos;t have enough allowance to stake this amount. Please approve first.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="space-x-2" disabled={isPending}>
              {isPending
                ? <RotateCw className="mr-2 size-4 animate-spin" />
                : hasEnoughAllowance
                ? <Download size={16} />
                : null}

              {hasEnoughAllowance ?
                <span>Stake</span> :
                <span>Approve</span>}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
