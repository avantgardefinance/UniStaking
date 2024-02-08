import { DelegatesSortBy } from "@/lib/generated/tally/graphql"
import { DelegatesQuery } from "@/lib/tally/delegates"
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://api.tally.xyz/query", {
  fetch,
  headers: {
    "Api-Key": process.env.TALLY_API_KEY as string
  }
})

export async function GET() {
  const first = await client.request({
    document: DelegatesQuery,
    variables: {
      input: {
        filters: {
          governanceId: "eip155:1:0x408ED6354d4973f66138C91495F2f2FCbd8724C3"
        },
        sort: {
          isDescending: true,
          sortBy: DelegatesSortBy.VOTES
        },
        page: {
          limit: 20
        }
      }
    }
  })

  const second = await client.request(DelegatesQuery, {
    input: {
      filters: {
        governanceId: "eip155:1:0x408ED6354d4973f66138C91495F2f2FCbd8724C3"
      },
      sort: {
        isDescending: true,
        sortBy: DelegatesSortBy.VOTES
      },
      page: {
        limit: 10,
        afterCursor: first.delegates.pageInfo.lastCursor
      }
    }
  })

  return Response.json([...first.delegates.nodes, ...second.delegates.nodes], {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=86400"
    }
  })
}

export const runtime = "edge"
