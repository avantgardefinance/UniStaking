import { never } from "@/lib/assertion"
import type { AccountEventsQuery as AccountEventsQueryGenerated } from "@/lib/generated/subgraph/graphql"
import { AccountEventsQuery } from "@/lib/subgraph/account-events"

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

  const { accountEvents } = await client.request({
    document: AccountEventsQuery,
    variables: {
      account
    }
  })

  const history = getHistory(accountEvents)

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

function getHistory(accountEvents: AccountEventsQueryGenerated["accountEvents"]) {
  const history: HistoryItem[] = []
  for (const accountEvent of accountEvents) {
    const eventTypename = accountEvent.event.__typename
    switch (eventTypename) {
      case "StakeDeposited":
        history.push({
          stakeId: accountEvent.event.deposit.id,
          amount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          id: accountEvent.event.id,
          type: eventTypename
        })
        break
      case "StakeWithdrawn":
        history.push({
          stakeId: accountEvent.event.deposit.id,
          amount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          id: accountEvent.event.id,
          type: eventTypename
        })
        break
      case "BeneficiaryAltered":
        history.push({
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldBeneficiary: accountEvent.event.oldBeneficiary,
          newBeneficiary: accountEvent.event.newBeneficiary,
          id: accountEvent.event.id,
          type: eventTypename
        })
        break
      case "DelegateeAltered":
        history.push({
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldDelegatee: accountEvent.event.oldDelegatee,
          newDelegatee: accountEvent.event.newDelegatee,
          id: accountEvent.event.id,
          type: eventTypename
        })
        break
      case "RewardClaimed":
        history.push({
          date: accountEvent.event.blockTimestamp,
          beneficiary: accountEvent.event.beneficiary,
          amount: accountEvent.event.amount,
          id: accountEvent.event.id,
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
