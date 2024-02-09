"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { RotateCw, Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"

const useUnstakeDialog = ({ availableForUnstaking, stakeId }: { stakeId: string; availableForUnstaking: bigint }) => {
  const { error: errorWrite, isPending: isPendingWrite, writeContract } = useWriteContractWithToast()

  const form = useForm({
    defaultValues: {
      amount: formatUnits(availableForUnstaking, 18)
    }
  })

  const { setValue } = form

  const onSubmit = (values: {
    amount: string
  }) =>
    writeContract({
      address: uniStaker,
      abi: abiUniStaker,
      functionName: "withdraw",
      args: [BigInt(stakeId), parseUnits(values.amount, 18)]
    })

  const setMaxAmount = () => setValue("amount", formatUnits(availableForUnstaking, 18))

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorWrite,
    isPending: isPendingWrite,
    setMaxAmount
  }
}

export function UnstakeDialogContent({
  availableForUnstaking,
  beneficiary,
  delegatee,
  stakeId
}: {
  availableForUnstaking: bigint
  stakeId: string
  delegatee: Address
  beneficiary: Address
}) {
  const { error, form, isPending, onSubmit, setMaxAmount } = useUnstakeDialog({
    availableForUnstaking,
    stakeId
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Unstake</DialogTitle>
        <DialogDescription className="sr-only">Enter the amount to unstake</DialogDescription>
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
                      <BigIntDisplay value={availableForUnstaking} decimals={18} precision={2} />
                      <span>UNI</span>
                    </Button>{" "}
                    to unstake
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                <span>ID</span>
                <span>{stakeId}</span>
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
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">{error.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="space-x-2" disabled={isPending}>
              {isPending ? <RotateCw size={16} className="mr-2 size-4 animate-spin" /> : <Upload size={16} />}
              <span>Unstake</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
