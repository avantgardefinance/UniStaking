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

export function handleBeneficiaryAltered(event: BeneficiaryAlteredEvent): void {
  const entity = new BeneficiaryAltered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositId = event.params.depositId
  entity.oldBeneficiary = event.params.oldBeneficiary
  entity.newBeneficiary = event.params.newBeneficiary

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const stakingPosition = getDeposit(event.params.depositId)
  stakingPosition.beneficiary = getOrCreateAccount(event.params.newBeneficiary).id
  stakingPosition.save()
}

export function handleDelegateeAltered(event: DelegateeAlteredEvent): void {
  const entity = new DelegateeAltered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositId = event.params.depositId
  entity.oldDelegatee = event.params.oldDelegatee
  entity.newDelegatee = event.params.newDelegatee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const stakingPosition = getDeposit(event.params.depositId)
  stakingPosition.delegatee = getOrCreateAccount(event.params.newDelegatee).id
  stakingPosition.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  const entity = new RewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beneficiary = event.params.beneficiary
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardNotified(event: RewardNotifiedEvent): void {
  const entity = new RewardNotified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeDeposited(event: StakeDepositedEvent): void {
  const entity = new StakeDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositId = event.params.depositId
  entity.amount = event.params.amount
  entity.totalDeposited = event.params.totalDeposited

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const stakingPosition = getOrCreateDeposit(event.params.depositId, event)
  stakingPosition.amount = stakingPosition.amount.plus(event.params.amount)
  stakingPosition.save()
}

export function handleStakeWithdrawn(event: StakeWithdrawnEvent): void {
  const entity = new StakeWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositId = event.params.depositId
  entity.amount = event.params.amount
  entity.remainingAmount = event.params.remainingAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const stakingPosition = getDeposit(event.params.depositId)
  stakingPosition.amount = stakingPosition.amount.minus(event.params.amount)
  stakingPosition.save()
}

export function handleSurrogateDeployed(event: SurrogateDeployedEvent): void {
  const entity = new SurrogateDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
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
