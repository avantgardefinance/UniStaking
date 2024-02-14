"use client"

import { config } from "@/components/providers/wagmi-provider"
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
import { Download, RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { Address, Hex } from "viem"
import { formatUnits, hexToSignature, isAddressEqual, parseUnits } from "viem"
import { useAccount, useChainId } from "wagmi"
import { readContract, signTypedData } from "wagmi/actions"

const useStakeMoreDialog = ({
  availableForStakingUni,
  stakeId
}: {
  availableForStakingUni: bigint
  stakeId: string
}) => {
  const account = useAccount()
  const chainId = useChainId()

  const { error: errorWrite, isPending: isPendingWrite, writeContract } = useWriteContractWithToast()

  const [signatureInfo, setSignatureInfo] = useState<{
    signature: Hex
    deadline: bigint
    owner: Address
    value: bigint
  }>()
  const [error, setError] = useState<Error>()

  const form = useForm({
    defaultValues: {
      amount: formatUnits(availableForStakingUni, 18)
    }
  })

  const { setValue, watch } = form

  const amount = watch("amount")

  const hasSignedEnoughValue = signatureInfo !== undefined && parseUnits(amount, 18) <= signatureInfo.value

  const onSubmit = async (values: {
    amount: string
  }) => {
    if (account.address === undefined) {
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
        functionName: "permitAndStakeMore",
        args: [BigInt(stakeId), parseUnits(values.amount, 18), signatureInfo.deadline, Number(v), r, s]
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
          types: permitEIP712Options.permitTypes,
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
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    hasSignedEnoughValue,
    error: errorWrite ?? error,
    isPending: isPendingWrite,
    setMaxAmount
  }
}

export function StakeMoreDialogContent({
  availableForStakingUni,
  beneficiary,
  delegatee,
  stakeId
}: {
  availableForStakingUni: bigint
  stakeId: string
  delegatee: Address
  beneficiary: Address
}) {
  const { error, form, hasSignedEnoughValue, isPending, onSubmit, setMaxAmount } = useStakeMoreDialog({
    availableForStakingUni,
    stakeId
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
