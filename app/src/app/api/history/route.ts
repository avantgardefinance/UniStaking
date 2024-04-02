import { type HistoryEntry, HistoryEntrySchema } from "@/app/api/history/model"
import { never } from "@/lib/assertion"
import { EventsQuery } from "@/lib/subgraph/events"
import { Schema } from "@effect/schema"
import { GraphQLClient } from "graphql-request"
import type { NextRequest } from "next/server"
import { isAddress } from "viem"

const encode = Schema.encodeSync(Schema.array(HistoryEntrySchema))
const client = new GraphQLClient("https://api.thegraph.com/subgraphs/name/enzymefinance/uni-staking-sepolia", {
  fetch
})

export async function GET(request: NextRequest) {
  const account = request.nextUrl.searchParams.get("account") || ""
  if (!isAddress(account)) {
    return new Response(null, { status: 400 })
  }

  const { events } = await client.request({
    document: EventsQuery,
    variables: {
      account
    }
  })

  const history: HistoryEntry[] = []
  for (const event of events) {
    const type = event.__typename

    switch (type) {
      case "StakeDeposited": {
        history.push({
          stakeId: event.deposit.id,
          amount: BigInt(event.amount),
          date: new Date(Number(event.blockTimestamp) * 1000),
          owner: event.deposit.owner.id,
          id: event.id,
          type
        })
        break
      }

      case "StakeWithdrawn": {
        history.push({
          stakeId: event.deposit.id,
          amount: BigInt(event.amount),
          date: new Date(Number(event.blockTimestamp) * 1000),
          owner: event.deposit.owner.id,
          id: event.id,
          type
        })
        break
      }

      case "BeneficiaryAltered": {
        history.push({
          stakeId: event.deposit.id,
          owner: event.deposit.owner.id,
          date: new Date(Number(event.blockTimestamp) * 1000),
          oldBeneficiary: event.oldBeneficiary,
          newBeneficiary: event.newBeneficiary,
          id: event.id,
          type
        })
        break
      }

      case "DelegateeAltered": {
        history.push({
          stakeId: event.deposit.id,
          owner: event.deposit.owner.id,
          date: new Date(Number(event.blockTimestamp) * 1000),
          oldDelegatee: event.oldDelegatee,
          newDelegatee: event.newDelegatee,
          id: event.id,
          type
        })
        break
      }

      case "RewardClaimed": {
        history.push({
          date: new Date(Number(event.blockTimestamp) * 1000),
          beneficiary: event.beneficiary,
          amount: BigInt(event.amount),
          id: event.id,
          type
        })
        break
      }

      case "RewardNotified":
      case "SurrogateDeployed":
      case undefined:
        break

      default:
        never(type, `Unhandled event type for route ${type}`)
    }
  }

  return Response.json(encode(history))
}

export const runtime = "edge"
