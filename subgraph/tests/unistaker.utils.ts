import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAltered,
  DelegateeAltered,
  MoreStaked,
  RewardClaimed,
  RewardNotified,
  Stake,
  StakeWithdrawn,
  SurrogateDeployed
} from "../generated/UniStaker/UniStaker"

export function createBeneficiaryAlteredEvent(
  depositId: BigInt,
  oldBeneficiary: Address,
  newBeneficiary: Address
): BeneficiaryAltered {
  let beneficiaryAlteredEvent = changetype<BeneficiaryAltered>(newMockEvent())

  beneficiaryAlteredEvent.parameters = new Array()

  beneficiaryAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  beneficiaryAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "oldBeneficiary",
      ethereum.Value.fromAddress(oldBeneficiary)
    )
  )
  beneficiaryAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "newBeneficiary",
      ethereum.Value.fromAddress(newBeneficiary)
    )
  )

  return beneficiaryAlteredEvent
}

export function createDelegateeAlteredEvent(
  depositId: BigInt,
  oldDelegatee: Address,
  newDelegatee: Address
): DelegateeAltered {
  let delegateeAlteredEvent = changetype<DelegateeAltered>(newMockEvent())

  delegateeAlteredEvent.parameters = new Array()

  delegateeAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  delegateeAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "oldDelegatee",
      ethereum.Value.fromAddress(oldDelegatee)
    )
  )
  delegateeAlteredEvent.parameters.push(
    new ethereum.EventParam(
      "newDelegatee",
      ethereum.Value.fromAddress(newDelegatee)
    )
  )

  return delegateeAlteredEvent
}

export function createMoreStakedEvent(
  depositId: BigInt,
  amount: BigInt,
  balance: BigInt
): MoreStaked {
  let moreStakedEvent = changetype<MoreStaked>(newMockEvent())

  moreStakedEvent.parameters = new Array()

  moreStakedEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  moreStakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  moreStakedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return moreStakedEvent
}

export function createRewardClaimedEvent(
  beneficiary: Address,
  amount: BigInt
): RewardClaimed {
  let rewardClaimedEvent = changetype<RewardClaimed>(newMockEvent())

  rewardClaimedEvent.parameters = new Array()

  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardClaimedEvent
}

export function createRewardNotifiedEvent(amount: BigInt): RewardNotified {
  let rewardNotifiedEvent = changetype<RewardNotified>(newMockEvent())

  rewardNotifiedEvent.parameters = new Array()

  rewardNotifiedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardNotifiedEvent
}

export function createStakeEvent(
  depositId: BigInt,
  amount: BigInt,
  delegatee: Address,
  beneficiary: Address
): Stake {
  let stakeEvent = changetype<Stake>(newMockEvent())

  stakeEvent.parameters = new Array()

  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("delegatee", ethereum.Value.fromAddress(delegatee))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )

  return stakeEvent
}

export function createStakeWithdrawnEvent(
  depositId: BigInt,
  amount: BigInt,
  remainingAmount: BigInt
): StakeWithdrawn {
  let stakeWithdrawnEvent = changetype<StakeWithdrawn>(newMockEvent())

  stakeWithdrawnEvent.parameters = new Array()

  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "remainingAmount",
      ethereum.Value.fromUnsignedBigInt(remainingAmount)
    )
  )

  return stakeWithdrawnEvent
}

export function createSurrogateDeployedEvent(
  delegatee: Address,
  surrogate: Address
): SurrogateDeployed {
  let surrogateDeployedEvent = changetype<SurrogateDeployed>(newMockEvent())

  surrogateDeployedEvent.parameters = new Array()

  surrogateDeployedEvent.parameters.push(
    new ethereum.EventParam("delegatee", ethereum.Value.fromAddress(delegatee))
  )
  surrogateDeployedEvent.parameters.push(
    new ethereum.EventParam("surrogate", ethereum.Value.fromAddress(surrogate))
  )

  return surrogateDeployedEvent
}
