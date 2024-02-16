"use client"

import { TallyDelegatee } from "@/app/api/delegatees/model"
import { DelegateeField } from "@/components/form/DelegateeField"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useTallyDelegatees } from "@/lib/hooks/use-tally-delegatees"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { Info, RotateCw } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import type { Address } from "viem"
import { encodeFunctionData, isAddressEqual } from "viem"

export function EditBeneficiaryDelegateeDialogContent({
  beneficiary,
  delegatee,
  stakeId
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
}) {
  const { error, isLoading, data } = useTallyDelegatees()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit beneficiary and delegatee</DialogTitle>
      </DialogHeader>
      {isLoading ? (
        "Loading..."
      ) : (
        <EditBeneficiaryDelegateeForm
          tallyDelegatees={data ?? []}
          beneficiary={beneficiary}
          delegatee={delegatee}
          stakeId={stakeId}
          tallyDelegateesError={error}
        />
      )}
    </DialogContent>
  )
}

const useEditBeneficiaryDelegateeForm = ({
  beneficiary: currentBeneficiary,
  delegatee: currentDelegatee,
  stakeId,
  tallyDelegatees,
  tallyDelegateesError
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
  tallyDelegatees: ReadonlyArray<TallyDelegatee>
  tallyDelegateesError: Error | null
}) => {
  const { error: errorWrite, isPending: isPendingWrite, writeContract } = useWriteContractWithToast()

  const tallyDelegatee = tallyDelegatees.find((delegatee) => isAddressEqual(delegatee.address, currentDelegatee))

  const form = useForm({
    defaultValues: {
      beneficiary: currentBeneficiary,
      customDelegatee: currentDelegatee,
      tallyDelegatee: tallyDelegatee?.address,
      delegateeOption: tallyDelegatee === undefined ? "custom" : "tally"
    }
  })

  const onSubmit = (values: {
    beneficiary: Address | undefined
    customDelegatee: Address | undefined
    tallyDelegatee: Address | undefined
    delegateeOption: string
  }) => {
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    if (values.beneficiary === undefined || delegatee === undefined) {
      return
    }

    if (isAddressEqual(values.beneficiary, currentBeneficiary)) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "alterDelegatee",
        args: [BigInt(stakeId), delegatee]
      })

      return
    }

    if (isAddressEqual(delegatee, currentDelegatee)) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "alterBeneficiary",
        args: [BigInt(stakeId), values.beneficiary]
      })

      return
    }

    const encodedDataAlterDelegatee = encodeFunctionData({
      abi: abiUniStaker,
      functionName: "alterDelegatee",
      args: [BigInt(stakeId), delegatee]
    })
    const encodedDataAlterBeneficiary = encodeFunctionData({
      abi: abiUniStaker,
      functionName: "alterBeneficiary",
      args: [BigInt(stakeId), values.beneficiary]
    })
    writeContract({
      address: uniStaker,
      abi: abiUniStaker,
      functionName: "multicall",
      args: [[encodedDataAlterDelegatee, encodedDataAlterBeneficiary]]
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit((values) => onSubmit(values)),
    error: errorWrite ?? tallyDelegateesError,
    isPending: isPendingWrite
  }
}

function EditBeneficiaryDelegateeForm({
  beneficiary,
  delegatee,
  stakeId,
  tallyDelegatees,
  tallyDelegateesError
}: {
  beneficiary: Address
  delegatee: Address
  stakeId: string
  tallyDelegatees: ReadonlyArray<TallyDelegatee>
  tallyDelegateesError: Error | null
}) {
  const { error, form, isPending, onSubmit } = useEditBeneficiaryDelegateeForm({
    beneficiary,
    delegatee,
    stakeId,
    tallyDelegatees,
    tallyDelegateesError
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <span>ID</span>
          <span>{stakeId}</span>
        </div>
        <Separator />
        <div className="space-y-4">
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
                          You can assign the fees your staked position earns to any address. The default address is your
                          own.
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
          <DelegateeField name="delegateeOption" tallyDelegatees={tallyDelegatees} />
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="break-all">{error.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" className="space-x-2" disabled={isPending}>
            {isPending ? <RotateCw className="mr-2 size-4 animate-spin" /> : null}

            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  )
}
