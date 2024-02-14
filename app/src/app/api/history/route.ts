import { never } from "@/lib/assertion"
import type { EventsQuery as EventsQueryGenerated } from "@/lib/generated/subgraph/graphql"
import { EventsQuery } from "@/lib/subgraph/events"

import { GraphQLClient } from "graphql-request"
import { Address } from "viem"

// TODO: Use the "production" subgraph url here when not in development mode.
const client = new GraphQLClient("http://localhost:8000/subgraphs/name/uniswap/staking", {
  fetch
})

export async function GET(request: Request) {
  const url = new URL(request.url)
  const account = new URLSearchParams(url.search).get("account")

  if (!account) {
    return new Response(null, { status: 400 })
  }

  const { events } = await client.request({
    document: EventsQuery,
    variables: {
      account
    }
  })

  const history = getHistory(events)

  return Response.json(history)
}

type HistoryItem = {
  date: Date
  id: string
} & (
  | { type: "StakeDeposited"; amount: bigint; owner: Address; stakeId: string }
  | { type: "StakeWithdrawn"; amount: bigint; owner: Address; stakeId: string }
  | {
      type: "BeneficiaryAltered"
      oldBeneficiary: Address
      newBeneficiary: Address
      owner: Address
      stakeId: string
    }
  | {
      type: "DelegateeAltered"
      oldDelegatee: Address
      newDelegatee: Address
      owner: Address
      stakeId: string
    }
  | { type: "RewardClaimed"; beneficiary: Address; amount: bigint }
)

export type GetHistoryResponse = ReturnType<typeof getHistory>

function getHistory(events: EventsQueryGenerated["events"]) {
  const history: HistoryItem[] = []
  for (const event of events) {
    const eventTypename = event.__typename
    switch (eventTypename) {
      case "StakeDeposited":
        history.push({
          stakeId: event.deposit.id,
          amount: event.amount,
          date: event.blockTimestamp,
          owner: event.deposit.owner.id,
          id: event.id,
          type: eventTypename
        })
        break
      case "StakeWithdrawn":
        history.push({
          stakeId: event.deposit.id,
          amount: event.amount,
          date: event.blockTimestamp,
          owner: event.deposit.owner.id,
          id: event.id,
          type: eventTypename
        })
        break
      case "BeneficiaryAltered":
        history.push({
          stakeId: event.deposit.id,
          owner: event.deposit.owner.id,
          date: event.blockTimestamp,
          oldBeneficiary: event.oldBeneficiary,
          newBeneficiary: event.newBeneficiary,
          id: event.id,
          type: eventTypename
        })
        break
      case "DelegateeAltered":
        history.push({
          stakeId: event.deposit.id,
          owner: event.deposit.owner.id,
          date: event.blockTimestamp,
          oldDelegatee: event.oldDelegatee,
          newDelegatee: event.newDelegatee,
          id: event.id,
          type: eventTypename
        })
        break
      case "RewardClaimed":
        history.push({
          date: event.blockTimestamp,
          beneficiary: event.beneficiary,
          amount: event.amount,
          id: event.id,
          type: eventTypename
        })
        break
      case "RewardNotified":
      case "SurrogateDeployed":
      case undefined:
        break
      default:
        never(eventTypename, `Unhandled event type for route ${eventTypename}`)
    }
  }
  return history
}

export const runtime = "edge"
