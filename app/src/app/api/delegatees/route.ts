import { TallyDelegateesSchema } from "@/app/api/delegatees/model"
import { invariant } from "@/lib/assertion"
import { DelegatesSortBy } from "@/lib/generated/tally/graphql"
import { DelegatesQuery } from "@/lib/tally/delegates"
import { Schema } from "@effect/schema"
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://api.tally.xyz/query", {
  fetch,
  headers: {
    "Api-Key": process.env.TALLY_API_KEY as string
  }
})

function query(limit: number, after?: string) {
  return client.request(DelegatesQuery, {
    input: {
      filters: {
        governorId: "eip155:1:0x408ED6354d4973f66138C91495F2f2FCbd8724C3"
      },
      sort: {
        isDescending: true,
        sortBy: DelegatesSortBy.VOTES
      },
      page: {
        limit,
        afterCursor: after
      }
    }
  })
}

const encode = Schema.encodeSync(TallyDelegateesSchema)

export async function GET() {
  const first = await query(20)
  const second = await query(10, first.delegates.pageInfo.lastCursor ?? undefined)
  const delegatees = [...first.delegates.nodes, ...second.delegates.nodes].map((delegatee) => {
    invariant(delegatee.__typename === "Delegate", "Expected delegatee")

    return {
      address: delegatee.account.address,
      label: delegatee.account.name || delegatee.account.ens || delegatee.account.address,
      votes: BigInt(delegatee.votesCount)
    }
  })

  return Response.json(encode(delegatees), {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=86400"
    }
  })
}

export const runtime = "edge"
