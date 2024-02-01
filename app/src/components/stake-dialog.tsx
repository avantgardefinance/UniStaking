"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

import { useForm } from "react-hook-form"

import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCallback } from "react"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { abi } from "../lib/abi/uni-staker"

export function StakeDialogContent({ availableForStakingUni }: { availableForStakingUni: bigint }) {
  const account = useAccount()
  const { write } = useContractWrite({
    address: "0x175527e743Dd01D80E463065e967073dB8C63070",
    abi,
    functionName: "stake"
  })

  const { data, error, isError, isLoading } = useContractRead({
    address: "0x175527e743Dd01D80E463065e967073dB8C63070",
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
    beneficiary: `0x${string}` | undefined
    delegatee: `0x${string}` | undefined
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

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription>
          Enter the amount, fee beneficiary and delegatee to stake
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
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
