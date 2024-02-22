import { TallyDelegatee } from "@/app/api/delegatees/model"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Info, Link } from "lucide-react"
import { useFormContext } from "react-hook-form"

function useDelegateeField({ name }: { name: string }) {
  const form = useFormContext()
  const delegateeOption = form.watch(name)

  return {
    form,
    delegateeOption
  }
}

export function DelegateeField({
  name,
  tallyDelegatees,
  disabled
}: {
  name: string
  disabled?: boolean
  tallyDelegatees: ReadonlyArray<TallyDelegatee>
}) {
  const { delegateeOption, form } = useDelegateeField({ name })

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
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
                    You must delegate your UNI&apos;s votes. The default address is your own, however there are many
                    active delegatees to choose from. You can view delegatee profiles
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
                    </Link>
                    .
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <RadioGroup
              disabled={disabled}
              onValueChange={delegateeOptionField.onChange}
              defaultValue={delegateeOptionField.value}
              value={delegateeOptionField.value}
              className="flex flex-col space-y-1"
            >
              <FormItem
                className={cn("flex items-center space-x-3 rounded-lg border-2 border-none border-blue-700 p-2", {
                  "border-solid": delegateeOption === "custom"
                })}
              >
                <FormControl>
                  <RadioGroupItem value="custom" />
                </FormControl>
                <FormLabel className="w-full space-y-2 font-normal">
                  <span>Custom address</span>
                  <FormField
                    control={form.control}
                    disabled={disabled}
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
                className={cn("flex items-center space-x-3 rounded-lg border-2 border-none border-blue-700 p-2", {
                  "border-solid": delegateeOption === "tally"
                })}
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
                          disabled={disabled}
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
                                <div className="flex items-start">
                                  <span>{delegatee.label}</span>
                                </div>
                                <div className="flex items-start space-x-1">
                                  <span>Votes:</span>
                                  <BigIntDisplay value={delegatee.votes} decimals={18} precision={2} />
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
  )
}
