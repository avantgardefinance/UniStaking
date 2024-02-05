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
import { useQueryClient } from "@tanstack/react-query"
import { Download, RotateCw } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useReadContract } from "wagmi"

const useStakeDialog = ({ availableForStakingUni }: { availableForStakingUni: bigint }) => {
  const account = useAccount()
  const {
    error: errorWrite,
    isPending: isPendingWrite,
    isSuccess: isSuccessWrite,
    writeContract
  } = useWriteContractWithToast()

  const queryClient = useQueryClient()

  const { data: allowance, queryKey: queryKeyAllowance } = useReadContract({
    address: governanceToken,
    abi: abiIERC20,
    functionName: "allowance",
    args: account.address === undefined ? undefined : [account.address, uniStaker]
  })

  useEffect(() => {
    if (isSuccessWrite) {
      queryClient.invalidateQueries({ queryKey: queryKeyAllowance })
    }
  }, [isSuccessWrite, queryClient, queryKeyAllowance])

  const form = useForm({
    defaultValues: {
      beneficiary: account.address,
      delegatee: account.address,
      amount: formatUnits(availableForStakingUni, 18)
    }
  })

  const { setValue, watch } = form

  const amount = watch("amount")

  const hasEnoughAllowance = allowance !== undefined && parseUnits(amount, 18) <= allowance

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
    setValue("amount", formatUnits(availableForStakingUni, 18))
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

export function StakeDialogContent({ availableForStakingUni }: { availableForStakingUni: bigint }) {
  const { error, form, hasEnoughAllowance, isPending, onSubmit, setMaxAmount } = useStakeDialog({
    availableForStakingUni
  })

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription>
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
                      <BigIntDisplay value={availableForStakingUni} decimals={18} />
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
                  <FormLabel>Beneficiary</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delegatee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delegatee</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
