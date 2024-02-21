import { isAddress, isAddressEqual, zeroAddress } from "viem"
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
