import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Account, AccountEvent } from "../generated/schema"

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

export function trackAccountEvent(account: Address, eventId: Bytes, depositId: BigInt | null): void {
  const accountEventId = account.toHex() + "/" + eventId.toHex()
  const accountEvent = new AccountEvent(accountEventId)
  accountEvent.account = account
  accountEvent.event = eventId
  accountEvent.deposit = depositId == null ? null : depositId.toString()
  accountEvent.save()
}
