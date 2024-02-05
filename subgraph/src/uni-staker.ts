import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
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
import {
  BeneficiaryAltered as BeneficiaryAlteredEvent,
  DelegateeAltered as DelegateeAlteredEvent,
  RewardClaimed as RewardClaimedEvent,
  RewardNotified as RewardNotifiedEvent,
  StakeDeposited as StakeDepositedEvent,
  StakeWithdrawn as StakeWithdrawnEvent,
  SurrogateDeployed as SurrogateDeployedEvent
} from "../generated/UniStaker/UniStaker"
import { getOrCreateAccount } from "./account"
import { getDeposit, getOrCreateDeposit } from "./deposit"
import { trackUniStakerHistory } from "./uni-staker-history"

function eventId(event: ethereum.Event): Bytes {
  return event.transaction.hash.concatI32(event.logIndex.toI32())
}

export function handleBeneficiaryAltered(event: BeneficiaryAlteredEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.beneficiary = getOrCreateAccount(event.params.newBeneficiary, event).id
  deposit.save()

  const entity = new BeneficiaryAltered(eventId(event))
  entity.type = "BeneficiaryAltered"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.oldBeneficiary = event.params.oldBeneficiary
  entity.newBeneficiary = event.params.newBeneficiary
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleDelegateeAltered(event: DelegateeAlteredEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.delegatee = getOrCreateAccount(event.params.newDelegatee, event).id
  deposit.save()

  const entity = new DelegateeAltered(eventId(event))
  entity.type = "DelegateeAltered"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.oldDelegatee = event.params.oldDelegatee
  entity.newDelegatee = event.params.newDelegatee
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  const entity = new RewardClaimed(eventId(event))
  entity.type = "RewardClaimed"
  entity.beneficiary = event.params.beneficiary
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  const account = getOrCreateAccount(event.params.beneficiary, event)
  account.claimedRewards = account.claimedRewards.plus(event.params.amount)
  account.save()

  trackUniStakerHistory(BigInt.fromI32(0), BigInt.fromI32(0), BigInt.fromI32(0), event.params.amount, event)
}

export function handleRewardNotified(event: RewardNotifiedEvent): void {
  const entity = new RewardNotified(eventId(event))
  entity.type = "RewardNotified"
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  trackUniStakerHistory(BigInt.fromI32(0), BigInt.fromI32(0), event.params.amount, BigInt.fromI32(0), event)
}

export function handleStakeDeposited(event: StakeDepositedEvent): void {
  const deposit = getOrCreateDeposit(event.params.depositId, event)
  deposit.amount = deposit.amount.plus(event.params.amount)
  deposit.save()

  const entity = new StakeDeposited(eventId(event))
  entity.type = "StakeDeposited"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.amount = event.params.amount
  entity.totalDeposited = event.params.totalDeposited
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  const account = getOrCreateAccount(Address.fromBytes(deposit.owner), event)
  account.totalStaked = account.totalStaked.plus(event.params.amount)
  account.currentlyStaked = account.currentlyStaked.plus(event.params.amount)
  account.save()

  trackUniStakerHistory(event.params.amount, BigInt.fromI32(0), BigInt.fromI32(0), BigInt.fromI32(0), event)
}

export function handleStakeWithdrawn(event: StakeWithdrawnEvent): void {
  const deposit = getDeposit(event.params.depositId)
  deposit.amount = deposit.amount.minus(event.params.amount)
  deposit.save()

  const entity = new StakeWithdrawn(eventId(event))
  entity.type = "StakeWithdrawn"
  entity.depositId = event.params.depositId
  entity.deposit = deposit.id
  entity.amount = event.params.amount
  entity.remainingAmount = event.params.remainingAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  const account = getOrCreateAccount(Address.fromBytes(deposit.owner), event)
  account.totalWithdrawn = account.totalWithdrawn.minus(event.params.amount)
  account.currentlyStaked = account.currentlyStaked.minus(event.params.amount)
  account.save()

  trackUniStakerHistory(BigInt.fromI32(0), event.params.amount, BigInt.fromI32(0), BigInt.fromI32(0), event)
}

export function handleSurrogateDeployed(event: SurrogateDeployedEvent): void {
  const entity = new SurrogateDeployed(eventId(event))
  entity.type = "SurrogateDeployed"
  entity.delegatee = event.params.delegatee
  entity.surrogate = event.params.surrogate
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  const surrogate = new Surrogate(event.params.surrogate)
  surrogate.delegatee = event.params.delegatee
  surrogate.createdAt = event.block.timestamp.toI32()
  surrogate.save()
}
