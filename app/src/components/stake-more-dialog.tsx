"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { abi as abiIERC20 } from "@/lib/abi/IERC20"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { governanceToken, uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Download, RotateCw } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useReadContract } from "wagmi"

const useStakeMoreDialog = ({ availableForStakingUni, stakeId }: {
  availableForStakingUni: bigint
  stakeId: bigint
}) => {
  const account = useAccount()

  const { data: allowance, queryKey: queryKeyAllowance } = useReadContract({
    address: governanceToken,
    abi: abiIERC20,
    functionName: "allowance",
    args: account.address === undefined ? undefined : [account.address, uniStaker]
  })

  const queryClient = useQueryClient()
  const {
    error: errorWrite,
    isPending: isPendingWrite,
    writeContract
  } = useWriteContractWithToast({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyAllowance })
    }
  })

  const form = useForm({
    defaultValues: {
      amount: formatUnits(availableForStakingUni, 18)
    }
  })

  const { setValue, watch } = form

  const amount = watch("amount")

  const hasEnoughAllowance = allowance !== undefined && parseUnits(amount, 18) <= allowance

  const onSubmit = (values: {
    amount: string
  }) => {
    if (hasEnoughAllowance) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "stakeMore",
        args: [stakeId, parseUnits(values.amount, 18)]
      })
    } else {
      writeContract({
        address: governanceToken,
        abi: abiIERC20,
        functionName: "approve",
        args: [uniStaker, parseUnits(values.amount, 18)]
      })
    }
  }

  const setMaxAmount = () => setValue("amount", formatUnits(availableForStakingUni, 18))

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    hasEnoughAllowance,
    error: errorWrite,
    isPending: isPendingWrite,
    setMaxAmount
  }
}

export function StakeMoreDialogContent(
  { availableForStakingUni, beneficiary, delegatee, stakeId }: {
    availableForStakingUni: bigint
    stakeId: bigint
    delegatee: Address
    beneficiary: Address
  }
) {
  const { error, form, hasEnoughAllowance, isPending, onSubmit, setMaxAmount } = useStakeMoreDialog({
    availableForStakingUni,
    stakeId
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription className="sr-only">
          Enter the amount to stake
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
            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                <span>ID</span>
                <span>{stakeId.toString()}</span>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Delegatee</span>
                <span>{delegatee}</span>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Beneficiary</span>
                <span>{beneficiary}</span>
              </div>
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
                ? <RotateCw size={16} className="mr-2 size-4 animate-spin" />
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
