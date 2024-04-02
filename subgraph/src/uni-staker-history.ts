// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { BigInt, type ethereum } from "@graphprotocol/graph-ts"
import { UniStakerHistory } from "../generated/schema"

const currentUniStakerHistoryId: string = "current"

function getOrCreateUniStakerHistoryItem(id: string, event: ethereum.Event): UniStakerHistory {
  let ush = UniStakerHistory.load(id)

  if (ush != null) {
    return ush
  }

  ush = new UniStakerHistory(id)
  ush.timestamp = event.block.timestamp.toI32()
  ush.totalStaked = BigInt.zero()
  ush.totalWithdrawn = BigInt.zero()
  ush.currentlyStaked = BigInt.zero()
  ush.totalRewards = BigInt.zero()
  ush.claimedRewards = BigInt.zero()
  ush.save()

  return ush
}

export function trackUniStakerHistory(
  stakeAmount: BigInt,
  withdrawAmount: BigInt,
  notifiedRewards: BigInt,
  claimedRewards: BigInt,
  event: ethereum.Event
): void {
  const current = getOrCreateUniStakerHistoryItem(currentUniStakerHistoryId, event)

  // // Create next history item
  const next = getOrCreateUniStakerHistoryItem(event.block.timestamp.toString(), event)
  next.totalStaked = current.totalStaked.plus(stakeAmount)
  next.totalWithdrawn = current.totalWithdrawn.plus(withdrawAmount)
  next.currentlyStaked = current.currentlyStaked.plus(stakeAmount).minus(withdrawAmount)
  next.totalRewards = current.totalRewards.plus(notifiedRewards)
  next.claimedRewards = current.claimedRewards.plus(claimedRewards)
  next.save()

  // Update current item
  current.totalStaked = next.totalStaked
  current.totalWithdrawn = next.totalWithdrawn
  current.currentlyStaked = next.currentlyStaked
  current.totalRewards = next.totalRewards
  current.claimedRewards = next.claimedRewards
  current.save()
}
