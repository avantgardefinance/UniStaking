import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Account } from "../generated/schema"

export function getOrCreateAccount(address: Address, event: ethereum.Event): Account {
  let account = Account.load(address)

  if (account != null) {
    return account
  }

  account = new Account(address)
  account.createdAt = event.block.timestamp.toI32()
  account.totalStaked = BigInt.fromI32(0)
  account.totalWithdrawn = BigInt.fromI32(0)
  account.currentlyStaked = BigInt.fromI32(0)
  account.claimedRewards = BigInt.fromI32(0)
  account.save()

  return account
}
