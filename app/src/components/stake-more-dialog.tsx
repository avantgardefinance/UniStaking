"use client"

import { config } from "@/components/providers/wagmi-provider"
import { AddressDisplay } from "@/components/ui/address-display"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { uniAbi } from "@/lib/abi/uni"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { governanceToken, permitEIP712Options, timeToMakeTransaction, uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Download, RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { formatUnits, hexToSignature, parseUnits } from "viem"
import { useChainId } from "wagmi"
import { readContract, signTypedData } from "wagmi/actions"

const useStakeMoreDialog = ({
  availableForStakingUni,
  stakeId,
  account
}: {
  availableForStakingUni: bigint
  stakeId: string
  account: Address
}) => {
  const client = useQueryClient()
  const chainId = useChainId()

  const {
    error: errorWrite,
    isPending: isPendingWrite,
    writeContract
  } = useWriteContractWithToast({
    mutation: {
      onSettled: () => client.invalidateQueries()
    }
  })

  const [error, setError] = useState<Error>()

  const form = useForm({
    defaultValues: {
      amount: formatUnits(availableForStakingUni, 18)
    }
  })

  const { setValue } = form

  const onSubmit = async (values: {
    amount: string
  }) => {
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
        functionName: "permitAndStakeMore",
        args: [BigInt(stakeId), parseUnits(values.amount, 18), signedDeadline, Number(v), r, s]
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
    error: errorWrite ?? error,
    isPending: isPendingWrite,
    setMaxAmount
  }
}

export function StakeMoreDialogContent({
  availableForStakingUni,
  beneficiary,
  delegatee,
  stakeId,
  account
}: {
  availableForStakingUni: bigint
  stakeId: string
  delegatee: Address
  beneficiary: Address
  account: Address
}) {
  const { error, form, isPending, onSubmit, setMaxAmount } = useStakeMoreDialog({
    availableForStakingUni,
    stakeId,
    account
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Stake</DialogTitle>
        <DialogDescription className="sr-only">Enter the amount to stake</DialogDescription>
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
                <span>{stakeId}</span>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Delegatee</span>
                <AddressDisplay value={delegatee} />
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <span>Beneficiary</span>
                <AddressDisplay value={beneficiary} />
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
              {isPending ? <RotateCw size={16} className="mr-2 size-4 animate-spin" /> : <Download size={16} />}

              <span>Permit & Stake</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
