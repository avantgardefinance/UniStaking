import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAltered,
  DelegateeAltered,
  RewardClaimed,
  RewardNotified,
  StakeDeposited,
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

export function createStakeDepositedEvent(
  depositId: BigInt,
  amount: BigInt,
  totalDeposited: BigInt
): StakeDeposited {
  let stakeDepositedEvent = changetype<StakeDeposited>(newMockEvent())

  stakeDepositedEvent.parameters = new Array()

  stakeDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  )
  stakeDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakeDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "totalDeposited",
      ethereum.Value.fromUnsignedBigInt(totalDeposited)
    )
  )

  return stakeDepositedEvent
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
