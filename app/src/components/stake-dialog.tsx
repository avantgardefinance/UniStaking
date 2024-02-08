"use client"

import { DelegateeField } from "@/components/form/DelegateeField"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { abi as abiIERC20 } from "@/lib/abi/IERC20"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { governanceToken, uniStaker } from "@/lib/consts"
import { useTallyDelegates } from "@/lib/hooks/use-tally-delegates"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Download, Info, RotateCw } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useReadContract } from "wagmi"

const useStakeDialog = ({ availableForStakingUni }: {
  availableForStakingUni: bigint
}) => {
  const account = useAccount()

  const { error: errorTallyDelegatees, isLoading: isLoadingTallyDelegatees, tallyDelegatees } = useTallyDelegates()
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
      beneficiary: account.address,
      customDelegatee: account.address,
      tallyDelegatee: undefined,
      amount: formatUnits(availableForStakingUni, 18),
      delegateeOption: "custom"
    }
  })

  const { setValue, watch } = form

  const [amount] = watch(["amount"])

  const hasEnoughAllowance = allowance !== undefined && parseUnits(amount, 18) <= allowance

  const onSubmit = (values: {
    beneficiary: Address | undefined
    customDelegatee: Address | undefined
    tallyDelegatee: Address | undefined
    delegateeOption: string
    amount: string
  }) => {
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    if (
      values.beneficiary === undefined || delegatee === undefined
    ) {
      return
    }

    if (hasEnoughAllowance) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "stake",
        args: [parseUnits(values.amount, 18), delegatee, values.beneficiary]
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
    error: errorWrite || errorTallyDelegatees,
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
    hasEnoughAllowance,
    isLoadingTallyDelegatees,
    isPending,
    onSubmit,
    setMaxAmount,
    tallyDelegatees
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
            {isLoadingTallyDelegatees
              ? "Loading..."
              : <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees} />}
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
