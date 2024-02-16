import { Schema } from "@effect/schema"
import type { Address } from "viem"

const AddressSchema: Schema.Schema<Address> = Schema.string.pipe(Schema.pattern(/^0x[0-9a-fA-F]{40}$/) as any)

export type TallyDelegatee = Schema.Schema.To<typeof TallyDelegateeSchema>
export const TallyDelegateeSchema = Schema.struct({
  address: AddressSchema,
  label: Schema.string,
  votes: Schema.bigint
})
