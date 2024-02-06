import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts"
import { Deposit } from "../generated/schema"
import { UniStaker } from "../generated/UniStaker/UniStaker"

export function getOrCreateDeposit(positionId: BigInt, event: ethereum.Event): Deposit {
  let deposit = Deposit.load(positionId.toString())

  if (deposit != null) {
    return deposit
  }

  // get deposit information from onchain call
  const unistaker = UniStaker.bind(event.address)
  const depositInformation = unistaker.try_deposits(positionId)
  let owner: Address = Address.zero()
  let delegatee: Address = Address.zero()
  let beneficiary: Address = Address.zero()
  if (depositInformation.reverted == false) {
    owner = depositInformation.value.value1
    delegatee = depositInformation.value.value2
    beneficiary = depositInformation.value.value3
  }

  deposit = new Deposit(positionId.toString())
  deposit.createdAt = event.block.timestamp.toI32()
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.amount = BigInt.zero()
  deposit.owner = owner
  deposit.delegatee = delegatee
  deposit.beneficiary = beneficiary
  deposit.save()

  return deposit
}

export function getDeposit(positionId: BigInt): Deposit {
  const deposit = Deposit.load(positionId.toString())

  if (deposit == null) {
    log.critical("Staking Position with positionId {} not found!", [positionId.toString()])
  }

  return deposit as Deposit
}
