import { Schema } from "@effect/schema"
import type { Address } from "viem"

const AddressSchema: Schema.Schema<Address> = Schema.string.pipe(Schema.pattern(/^0x[0-9a-fA-F]{40}$/) as any)

export type StakeDeposited = Schema.Schema.Type<typeof StakeDepositSchema>
export const StakeDepositSchema = Schema.struct({
  type: Schema.literal("StakeDeposited"),
  amount: Schema.bigint,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type StakeWithdrawn = Schema.Schema.Type<typeof StakeWithdrawnSchema>
export const StakeWithdrawnSchema = Schema.struct({
  type: Schema.literal("StakeWithdrawn"),
  amount: Schema.bigint,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type BeneficiaryAltered = Schema.Schema.Type<typeof BeneficiaryAlteredSchema>
export const BeneficiaryAlteredSchema = Schema.struct({
  type: Schema.literal("BeneficiaryAltered"),
  oldBeneficiary: AddressSchema,
  newBeneficiary: AddressSchema,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type DelegateeAltered = Schema.Schema.Type<typeof DelegateeAlteredSchema>
export const DelegateeAlteredSchema = Schema.struct({
  type: Schema.literal("DelegateeAltered"),
  oldDelegatee: AddressSchema,
  newDelegatee: AddressSchema,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type RewardClaimed = Schema.Schema.Type<typeof RewardClaimedSchema>
export const RewardClaimedSchema = Schema.struct({
  type: Schema.literal("RewardClaimed"),
  beneficiary: AddressSchema,
  amount: Schema.bigint,
  date: Schema.Date,
  id: Schema.string
})

export type HistoryEntry = Schema.Schema.Type<typeof HistoryEntrySchema>
export const HistoryEntrySchema = Schema.union(
  StakeDepositSchema,
  StakeWithdrawnSchema,
  BeneficiaryAlteredSchema,
  DelegateeAlteredSchema,
  RewardClaimedSchema
)

export type History = Schema.Schema.Type<typeof HistorySchema>
export const HistorySchema = Schema.array(HistoryEntrySchema)
