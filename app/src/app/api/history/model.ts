import { Schema } from "@effect/schema"
import { Address } from "viem"

const AddressSchema: Schema.Schema<Address> = Schema.string.pipe(Schema.pattern(/^0x[0-9a-fA-F]{40}$/) as any)

export type StakeDeposited = Schema.Schema.To<typeof StakeDepositSchema>
export const StakeDepositSchema = Schema.struct({
  type: Schema.literal("StakeDeposited"),
  amount: Schema.bigint,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type StakeWithdrawn = Schema.Schema.To<typeof StakeWithdrawnSchema>
export const StakeWithdrawnSchema = Schema.struct({
  type: Schema.literal("StakeWithdrawn"),
  amount: Schema.bigint,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type BeneficiaryAltered = Schema.Schema.To<typeof BeneficiaryAlteredSchema>
export const BeneficiaryAlteredSchema = Schema.struct({
  type: Schema.literal("BeneficiaryAltered"),
  oldBeneficiary: AddressSchema,
  newBeneficiary: AddressSchema,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type DelegateeAltered = Schema.Schema.To<typeof DelegateeAlteredSchema>
export const DelegateeAlteredSchema = Schema.struct({
  type: Schema.literal("DelegateeAltered"),
  oldDelegatee: AddressSchema,
  newDelegatee: AddressSchema,
  owner: AddressSchema,
  stakeId: Schema.string,
  date: Schema.Date,
  id: Schema.string
})

export type RewardClaimed = Schema.Schema.To<typeof RewardClaimedSchema>
export const RewardClaimedSchema = Schema.struct({
  type: Schema.literal("RewardClaimed"),
  beneficiary: AddressSchema,
  amount: Schema.bigint,
  date: Schema.Date,
  id: Schema.string
})

export type HistoryEntry = Schema.Schema.To<typeof HistoryEntrySchema>
export const HistoryEntrySchema = Schema.union(
  StakeDepositSchema,
  StakeWithdrawnSchema,
  BeneficiaryAlteredSchema,
  DelegateeAlteredSchema,
  RewardClaimedSchema
)
