import { isAddress, isAddressEqual, parseUnits, zeroAddress } from "viem"
import { z } from "zod"

export const address = z.string().transform((value, ctx) => {
  if (!isAddress(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid address"
    })

    return z.NEVER
  }

  if (isAddressEqual(value, zeroAddress)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Zero address not allowed"
    })

    return z.NEVER
  }
  return value
})

export const stakeMoreUnstakeFormSchema = z
  .object({
    balance: z.bigint(),
    amount: z.string().transform((value, ctx) => {
      const parsedValue = value === "" ? 0n : parseUnits(value, 18)
      if (parsedValue === 0n) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount must be greater than 0"
        })
        return z.NEVER
      }

      return parsedValue
    })
  })
  .transform((value, ctx) => {
    if (value.balance < value.amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount must be less than or equal to balance",
        path: ["amount"]
      })
      return z.NEVER
    }

    return value
  })
