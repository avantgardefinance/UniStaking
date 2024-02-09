import { never } from "@/lib/assertion"
import { AccountEventsQuery } from "@/lib/subgraph/account-events"
import { GraphQLClient } from "graphql-request"

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

  const parsedAccountEvents = accountEvents.map((accountEvent) => {
    const eventTypename = accountEvent.event.__typename
    switch (eventTypename) {
      case "StakeDeposited":
        return {
          stakeId: accountEvent.event.deposit.id,
          amount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          id: accountEvent.event.id,
          type: eventTypename
        }
      case "StakeWithdrawn":
        return {
          stakeId: accountEvent.event.deposit.id,
          amount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          id: accountEvent.event.id,
          type: eventTypename
        }
      case "BeneficiaryAltered":
        return {
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldBeneficiary: accountEvent.event.oldBeneficiary,
          newBeneficiary: accountEvent.event.newBeneficiary,
          id: accountEvent.event.id,
          type: eventTypename
        }
      case "DelegateeAltered":
        return {
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldDelegatee: accountEvent.event.oldDelegatee,
          newDelegatee: accountEvent.event.newDelegatee,
          id: accountEvent.event.id,
          type: eventTypename
        }
      case "RewardClaimed":
        return {
          date: accountEvent.event.blockTimestamp,
          beneficiary: accountEvent.event.beneficiary,
          amount: accountEvent.event.amount,
          id: accountEvent.event.id,
          type: eventTypename
        }
      case "RewardNotified":
      case "SurrogateDeployed":
      case undefined:
        return new Response(null, { status: 500 })
      default:
        never(eventTypename, `Unhandled event type for route ${eventTypename}`)
    }
  })

  return Response.json(parsedAccountEvents)
}

export const runtime = "edge"
