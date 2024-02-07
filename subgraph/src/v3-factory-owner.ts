import { FeesClaimed } from "../generated/schema"
import { FeesClaimed as FeesClaimedEvent } from "../generated/V3FactoryOwner/V3FactoryOwner"

export function handleFeesClaimed(event: FeesClaimedEvent): void {
  const entity = new FeesClaimed(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.pool = event.params.pool
  entity.caller = event.params.caller
  entity.recipient = event.params.recipient
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}
