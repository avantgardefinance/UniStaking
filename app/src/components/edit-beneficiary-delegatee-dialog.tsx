"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button, buttonVariants } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Info, RotateCw } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { encodeFunctionData, isAddressEqual } from "viem"

type TallyDelegatee = { address: Address; label: string; votesCount: bigint }

const useEditBeneficiaryDelegateeDialog = () => {
  const tallyDelegateesQuery = useQuery({
    queryKey: ["delegatees"],
    queryFn: async () => {
      const response = await fetch("/api/delegates")
      return response.json()
    }
  })

  // TODO: type that properly. Parse the tally response from api, and infer type from it
  const tallyDelegatees: Array<TallyDelegatee> = tallyDelegateesQuery.data?.map((
    delegatee: any
  ) => {
    const { account: { address, ens, name }, votesCount } = delegatee

    const label = name !== ""
      ? name
      : ens !== ""
      ? ens
      : address

    return {
      votesCount,
      label,
      address
    }
  }) ?? []

  return {
    tallyDelegatees,
    isLoading: tallyDelegateesQuery.isLoading,
    isError: tallyDelegateesQuery.isError
  }
}

export function EditBeneficiaryDelegateeDialogContent({ beneficiary, delegatee, stakeId }: {
  beneficiary: Address
  delegatee: Address
  stakeId: bigint
}) {
  const { isError, isLoading, tallyDelegatees } = useEditBeneficiaryDelegateeDialog()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit beneficiary and delegatee</DialogTitle>
      </DialogHeader>
      {isLoading ? "Loading..." : isError ? "Error" : (
        <EditBeneficiaryDelegateeForm
          tallyDelegatees={tallyDelegatees}
          beneficiary={beneficiary}
          delegatee={delegatee}
          stakeId={stakeId}
        />
      )}
    </DialogContent>
  )
}

const useEditBeneficiaryDelegateeForm = (
  { beneficiary: currentBeneficiary, delegatee: currentDelegatee, stakeId, tallyDelegatees }: {
    beneficiary: Address
    delegatee: Address
    stakeId: bigint
    tallyDelegatees: Array<TallyDelegatee>
  }
) => {
  const {
    error: errorWrite,
    isPending: isPendingWrite,
    writeContract
  } = useWriteContractWithToast()

  const tallyDelegatee = tallyDelegatees.find((delegatee) => isAddressEqual(delegatee.address, currentDelegatee))

  const form = useForm({
    defaultValues: {
      beneficiary: currentBeneficiary,
      customDelegatee: currentDelegatee,
      tallyDelegatee: tallyDelegatee?.address,
      delegateeOption: tallyDelegatee === undefined ? "custom" : "tally"
    }
  })

  const { watch } = form

  const [delegateeOption] = watch(["delegateeOption"])

  const onSubmit = (values: {
    beneficiary: Address | undefined
    customDelegatee: Address | undefined
    tallyDelegatee: Address | undefined
    delegateeOption: string
  }) => {
    const delegatee = values.delegateeOption === "custom" ? values.customDelegatee : values.tallyDelegatee

    if (
      values.beneficiary === undefined || delegatee === undefined
    ) {
      return
    }

    if (isAddressEqual(values.beneficiary, currentBeneficiary)) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "alterDelegatee",
        args: [stakeId, delegatee]
      })

      return
    }

    if (isAddressEqual(delegatee, currentDelegatee)) {
      writeContract({
        address: uniStaker,
        abi: abiUniStaker,
        functionName: "alterBeneficiary",
        args: [stakeId, values.beneficiary]
      })

      return
    }

    const encodedDataAlterDelegatee = encodeFunctionData({
      abi: abiUniStaker,
      functionName: "alterDelegatee",
      args: [stakeId, delegatee]
    })
    const encodedDataAlterBeneficiary = encodeFunctionData({
      abi: abiUniStaker,
      functionName: "alterBeneficiary",
      args: [stakeId, values.beneficiary]
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
    error: errorWrite,
    isPending: isPendingWrite,
    delegateeOption
  }
}

function EditBeneficiaryDelegateeForm({ beneficiary, delegatee, stakeId, tallyDelegatees }: {
  beneficiary: Address
  delegatee: Address
  stakeId: bigint
  tallyDelegatees: Array<TallyDelegatee>
}) {
  const { delegateeOption, error, form, isPending, onSubmit } = useEditBeneficiaryDelegateeForm({
    beneficiary,
    delegatee,
    stakeId,
    tallyDelegatees
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <span>ID</span>
          <span>{stakeId.toString()}</span>
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

          <FormField
            control={form.control}
            name="delegateeOption"
            render={({ field: delegateeOptionField }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex flex-row space-x-2">
                          <span>Delegatee</span>
                          <Info size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          You must delegate your UNI&apos;s votesCount. The default address is your own, however there
                          are many active delegatees to choose from. You can view delegatee profiles
                          <Link href="https://www.tally.xyz/gov/uniswap" target="_blank">
                            {" "}
                            <div
                              className={cn(
                                buttonVariants({
                                  variant: "link"
                                }),
                                "space-x-2 p-0"
                              )}
                            >
                              here
                            </div>
                          </Link>.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={delegateeOptionField.onChange}
                    defaultValue={delegateeOptionField.value}
                    value={delegateeOptionField.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 rounded-lg border-2 border-none border-blue-700 p-2",
                        {
                          "border-solid": delegateeOption === "custom"
                        }
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="custom" />
                      </FormControl>
                      <FormLabel className="w-full space-y-2 font-normal">
                        <span>Custom address</span>
                        <FormField
                          control={form.control}
                          name="customDelegatee"
                          render={({ field: customDelegateeField }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...customDelegateeField}
                                  onChange={(...values) => {
                                    customDelegateeField.onChange(...values)
                                    if (delegateeOption !== "custom") {
                                      delegateeOptionField.onChange("custom")
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormLabel>
                    </FormItem>
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 rounded-lg border-2 border-none border-blue-700 p-2",
                        {
                          "border-solid": delegateeOption === "tally"
                        }
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="tally" />
                      </FormControl>
                      <FormLabel className="w-full space-y-1 font-normal">
                        <span>Top 30 delegatees from Tally</span>
                        <FormField
                          control={form.control}
                          name="tallyDelegatee"
                          render={({ field: fieldTallyDelegatee }) => (
                            <FormItem>
                              <Select
                                onValueChange={(value) => {
                                  fieldTallyDelegatee.onChange(value)
                                  delegateeOptionField.onChange("tally")
                                }}
                                defaultValue={fieldTallyDelegatee.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {tallyDelegatees.map((delegatee) => (
                                    <SelectItem
                                      key={delegatee.address}
                                      value={delegatee.address}
                                    >
                                      <div className="flex items-start">
                                        <span>{delegatee.label}</span>
                                      </div>
                                      <div className="flex items-start space-x-1">
                                        <span>Votes:</span>
                                        <BigIntDisplay value={delegatee.votesCount} decimals={18} precision={2} />
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
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
        </div>

        <DialogFooter>
          <Button type="submit" className="space-x-2" disabled={isPending}>
            {isPending
              ? <RotateCw className="mr-2 size-4 animate-spin" />
              : null}

            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
