"use client"

import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { abi } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { Download } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useContractRead, useContractWrite } from "wagmi"

const useStakeDialog = ({ availableForStakingUni }: { availableForStakingUni: bigint }) => {
  const account = useAccount()
  const { write } = useContractWrite({
    address: uniStaker,
    abi,
    functionName: "stake"
  })

  const { data, error, isError, isLoading } = useContractRead({
    address: uniStaker,
    abi,
    functionName: "rewardRate"
  })

  console.log({ data, error })

  const form = useForm({
    defaultValues: {
      beneficiary: account.address,
      delegatee: account.address,
      amount: formatUnits(availableForStakingUni, 18)
    }
  })

  const onSubmit = useCallback(async (values: {
    beneficiary: Address | undefined
    delegatee: Address | undefined
    amount: string
  }) => {
    console.log(values)

    if (values.beneficiary === undefined || values.delegatee === undefined) {
      return
    }

    write({
      args: [parseUnits(values.amount, 18), values.delegatee, values.beneficiary]
    })
  }, [write])

  return { form, onSubmit: form.handleSubmit((values) => onSubmit(values)) }
}

export function StakeDialogContent({ availableForStakingUni }: { availableForStakingUni: bigint }) {
  const { form, onSubmit } = useStakeDialog({ availableForStakingUni })

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription>
          Enter the amount, fee beneficiary and delegatee to stake
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit}>
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
                    <Button variant="link" className="space-x-1 px-0">
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
          </div>
          <DialogFooter>
            <Button type="submit" className="space-x-2">
              <Download size={16} />
              <span>Stake</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
