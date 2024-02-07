"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Info, RotateCw } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { encodeFunctionData, isAddressEqual } from "viem"

const useEditBeneficiaryDelegateeDialog = ({ beneficiary: currentBeneficiary, delegatee: currentDelegatee, stakeId }: {
  beneficiary: Address
  delegatee: Address
  stakeId: bigint
}) => {
  const {
    error: errorWrite,
    isPending: isPendingWrite,
    writeContract
  } = useWriteContractWithToast()
  const tallyDelegatees = [{ label: "tally 1", address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" }, {
    label: "tally 2",
    address: "0x1D12E5B92F5638d643C273F0dF2150D5AcC5e5d0"
  }] as const

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
    delegateeOption,
    tallyDelegatees
  }
}

export function EditBeneficiaryDelegateeDialogContent({ beneficiary, delegatee, stakeId }: {
  beneficiary: Address
  delegatee: Address
  stakeId: bigint
}) {
  const { delegateeOption, error, form, isPending, onSubmit, tallyDelegatees } = useEditBeneficiaryDelegateeDialog({
    beneficiary,
    delegatee,
    stakeId
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit beneficiary and delegatee</DialogTitle>
      </DialogHeader>
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
                            You must delegate your UNI&apos;s votes. The default address is your own, however there are
                            many active delegatees to choose from. You can view delegatee profiles
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
                                      <SelectItem key={delegatee.address} value={delegatee.address}>
                                        {delegatee.label}
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
    </DialogContent>
  )
}
