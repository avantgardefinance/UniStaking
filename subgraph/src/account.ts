import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Account, AccountEvent } from "../generated/schema"

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

export function trackAccountEvent(account: Address, eventId: Bytes): void {
  const accountEventId = account.toHex() + "/" + eventId.toHex()
  const accountEvent = new AccountEvent(accountEventId)
  accountEvent.account = account
  accountEvent.event = eventId
  accountEvent.save()
}
