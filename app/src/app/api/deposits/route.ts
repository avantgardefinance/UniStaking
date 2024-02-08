import { DepositsQuery } from "@/lib/subgraph/deposits"
import { GraphQLClient } from "graphql-request"

// TODO: Use the "production" subgraph url here when not in development mode.
const client = new GraphQLClient("http://localhost:8000/subgraphs/name/uniswap/staking", {
  fetch
})

export async function GET(request: Request) {
  const url = new URL(request.url)
  const account = new URLSearchParams(url.search).get("account")

  const { deposits } = await client.request({
    document: DepositsQuery,
    variables: {
      account
    }
  })

  const parsedDeposits = deposits.map((deposit) => {
    return {
      stakeId: deposit.id,
      stakedAmount: deposit.amount,
      createdAt: deposit.createdAt,
      updatedAt: deposit.updatedAt,
      owner: deposit.owner.id,
      delegatee: deposit.delegatee.id,
      beneficiary: deposit.beneficiary.id
    }
  })

  return Response.json(parsedDeposits)
}

export const runtime = "edge"
