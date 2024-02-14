// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAltered as BeneficiaryAlteredEvent,
  DelegateeAltered as DelegateeAlteredEvent,
  RewardClaimed as RewardClaimedEvent,
  RewardNotified as RewardNotifiedEvent,
  StakeDeposited as StakeDepositedEvent,
  StakeWithdrawn as StakeWithdrawnEvent,
  SurrogateDeployed as SurrogateDeployedEvent
} from "../generated/UniStaker/UniStaker"
import {
  BeneficiaryAltered,
  DelegateeAltered,
  RewardClaimed,
  RewardNotified,
  StakeDeposited,
  StakeWithdrawn,
  Surrogate,
  SurrogateDeployed
} from "../generated/schema"
import { arrayUnique } from "../utils/array"
import { getOrCreateAccount } from "./account"
import { getDeposit, getOrCreateDeposit } from "./deposit"
import { trackUniStakerHistory } from "./uni-staker-history"

function eventId(event: ethereum.Event): Bytes {
  return event.transaction.hash.concatI32(event.logIndex.toI32())
}

export function handleBeneficiaryAltered(event: BeneficiaryAlteredEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.beneficiary = getOrCreateAccount(event.params.newBeneficiary, event).id
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.save()

  const entityId = eventId(event)
  const entity = new BeneficiaryAltered(entityId)
  entity.type = "BeneficiaryAltered"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.oldBeneficiary = event.params.oldBeneficiary
  entity.newBeneficiary = event.params.newBeneficiary
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  const affacted = [deposit.owner, deposit.delegatee, event.params.newBeneficiary]
  // Only tracking actual changes (beneficiary is initially set to address zero)
  if (!event.params.oldBeneficiary.notEqual(Address.zero())) {
    affacted.push(event.params.oldBeneficiary)
  }
  entity.affected = arrayUnique(affacted)
  entity.save()
}

export function handleDelegateeAltered(event: DelegateeAlteredEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.delegatee = getOrCreateAccount(event.params.newDelegatee, event).id
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.save()

  const entityId = eventId(event)
  const entity = new DelegateeAltered(entityId)
  entity.type = "DelegateeAltered"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.oldDelegatee = event.params.oldDelegatee
  entity.newDelegatee = event.params.newDelegatee
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  const affacted = [deposit.owner, deposit.delegatee, deposit.beneficiary]
  // Only tracking actual changes (beneficiary is initially set to address zero)
  if (!event.params.oldDelegatee.notEqual(Address.zero())) {
    affacted.push(event.params.oldDelegatee)
  }
  entity.affected = arrayUnique(affacted)
  entity.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  const entityId = eventId(event)
  const entity = new RewardClaimed(entityId)
  entity.type = "RewardClaimed"
  entity.beneficiary = event.params.beneficiary
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.affected = [event.params.beneficiary]
  entity.save()

  const account = getOrCreateAccount(event.params.beneficiary, event)
  account.claimedRewards = account.claimedRewards.plus(event.params.amount)
  account.save()

  trackUniStakerHistory(BigInt.zero(), BigInt.zero(), BigInt.zero(), event.params.amount, event)
}

export function handleRewardNotified(event: RewardNotifiedEvent): void {
  const entity = new RewardNotified(eventId(event))
  entity.type = "RewardNotified"
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.affected = []
  entity.save()

  trackUniStakerHistory(BigInt.zero(), BigInt.zero(), event.params.amount, BigInt.zero(), event)
}

export function handleStakeDeposited(event: StakeDepositedEvent): void {
  const deposit = getOrCreateDeposit(event.params.depositId, event)
  deposit.amount = deposit.amount.plus(event.params.amount)
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.save()

  const entityId = eventId(event)
  const entity = new StakeDeposited(entityId)
  entity.type = "StakeDeposited"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.amount = event.params.amount
  entity.totalDeposited = event.params.depositBalance
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.affected = arrayUnique([event.params.owner, deposit.delegatee, deposit.beneficiary])
  entity.save()

  const account = getOrCreateAccount(Address.fromBytes(deposit.owner), event)
  account.totalStaked = account.totalStaked.plus(event.params.amount)
  account.currentlyStaked = account.currentlyStaked.plus(event.params.amount)
  account.save()

  trackUniStakerHistory(event.params.amount, BigInt.zero(), BigInt.zero(), BigInt.zero(), event)
}

export function handleStakeWithdrawn(event: StakeWithdrawnEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.amount = deposit.amount.minus(event.params.amount)
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.save()

  const entityId = eventId(event)
  const entity = new StakeWithdrawn(entityId)
  entity.type = "StakeWithdrawn"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.amount = event.params.amount
  entity.remainingAmount = event.params.depositBalance
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.affected = arrayUnique([deposit.owner, deposit.delegatee, deposit.beneficiary])
  entity.save()

  const account = getOrCreateAccount(Address.fromBytes(deposit.owner), event)
  account.totalWithdrawn = account.totalWithdrawn.minus(event.params.amount)
  account.currentlyStaked = account.currentlyStaked.minus(event.params.amount)
  account.save()

  trackUniStakerHistory(BigInt.zero(), event.params.amount, BigInt.zero(), BigInt.zero(), event)
}

export function handleSurrogateDeployed(event: SurrogateDeployedEvent): void {
  const entity = new SurrogateDeployed(eventId(event))
  entity.type = "SurrogateDeployed"
  entity.delegatee = event.params.delegatee
  entity.surrogate = event.params.surrogate
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.affected = []
  entity.save()

  const surrogate = new Surrogate(event.params.surrogate)
  surrogate.delegatee = event.params.delegatee
  surrogate.createdAt = event.block.timestamp.toI32()
  surrogate.save()
}
