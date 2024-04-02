import { Schema } from "@effect/schema"
import type { Address } from "viem"

const AddressSchema: Schema.Schema<Address> = Schema.string.pipe(Schema.pattern(/^0x[0-9a-fA-F]{40}$/) as any)

export type Deposit = Schema.Schema.Type<typeof DepositSchema>
export const DepositSchema = Schema.struct({
  stakeId: Schema.string,
  stakedAmount: Schema.bigint,
  createdAt: Schema.Date,
  updatedAt: Schema.Date,
  owner: AddressSchema,
  delegatee: AddressSchema,
  beneficiary: AddressSchema
})

export type Deposits = Schema.Schema.Type<typeof DepositsSchema>
export const DepositsSchema = Schema.array(DepositSchema)

export type AccountDeposits = Schema.Schema.Type<typeof AccountDepositsSchema>
export const AccountDepositsSchema = Schema.struct({
  deposits: DepositsSchema,
  total: Schema.bigint
})
