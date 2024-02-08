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

  const parsedDeposits = accountEvents.map((accountEvent) => {
    const eventTypename = accountEvent.event.__typename
    switch (eventTypename) {
      case "StakeDeposited":
        return {
          stakeId: accountEvent.event.deposit.id,
          stakedAmount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          amount: accountEvent.event.amount
        }
      case "StakeWithdrawn":
        return {
          stakeId: accountEvent.event.deposit.id,
          stakedAmount: accountEvent.event.amount,
          date: accountEvent.event.blockTimestamp,
          owner: accountEvent.event.deposit.owner.id,
          amount: accountEvent.event.amount
        }
      case "BeneficiaryAltered":
        return {
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldBeneficiary: accountEvent.event.oldBeneficiary,
          newBeneficiary: accountEvent.event.newBeneficiary
        }
      case "DelegateeAltered":
        return {
          stakeId: accountEvent.event.deposit.id,
          owner: accountEvent.event.deposit.owner.id,
          date: accountEvent.event.blockTimestamp,
          oldDelegatee: accountEvent.event.oldDelegatee,
          newDelegatee: accountEvent.event.newDelegatee
        }
      case "RewardClaimed":
        return {
          date: accountEvent.event.blockTimestamp,
          beneficiary: accountEvent.event.beneficiary,
          amount: accountEvent.event.amount
        }
      case "RewardNotified":
      case "SurrogateDeployed":
      case undefined:
        return new Response(null, { status: 500 })
      default:
        never(eventTypename, "Unhandled event type")
    }
  })

  return Response.json(parsedDeposits)
}

export const runtime = "edge"
