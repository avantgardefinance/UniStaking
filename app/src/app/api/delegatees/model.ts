import { Schema } from "@effect/schema"
import type { Address } from "viem"

const AddressSchema: Schema.Schema<Address> = Schema.string.pipe(Schema.pattern(/^0x[0-9a-fA-F]{40}$/) as any)

export type TallyDelegatee = Schema.Schema.Type<typeof TallyDelegateeSchema>
export const TallyDelegateeSchema = Schema.struct({
  address: AddressSchema,
  label: Schema.string,
  votes: Schema.bigint
})

export type TallyDelegatees = Schema.Schema.Type<typeof TallyDelegateesSchema>
export const TallyDelegateesSchema = Schema.array(TallyDelegateeSchema)
