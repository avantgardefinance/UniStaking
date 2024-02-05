import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts"
import { Deposit } from "../generated/schema"

export function getOrCreateDeposit(positionId: BigInt, event: ethereum.Event): Deposit {
  let deposit = Deposit.load(positionId.toString())

  if (deposit != null) {
    return deposit
  }

  deposit = new Deposit(positionId.toString())
  deposit.createdAt = event.block.timestamp.toI32()
  deposit.updatedAt = event.block.timestamp.toI32()
  deposit.amount = BigInt.fromI32(0)
  deposit.owner = Address.fromI32(0)
  deposit.delegatee = Address.fromI32(0)
  deposit.beneficiary = Address.fromI32(0)
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
