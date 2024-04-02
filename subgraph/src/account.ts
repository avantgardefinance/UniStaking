// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { type Address, BigInt, type ethereum } from "@graphprotocol/graph-ts"
import { Account } from "../generated/schema"

export function getOrCreateAccount(address: Address, event: ethereum.Event): Account {
  let account = Account.load(address)

  if (account != null) {
    return account
  }

  account = new Account(address)
  account.createdAt = event.block.timestamp.toI32()
  account.totalStaked = BigInt.zero()
  account.totalWithdrawn = BigInt.zero()
  account.currentlyStaked = BigInt.zero()
  account.claimedRewards = BigInt.zero()
  account.save()

  return account
}
