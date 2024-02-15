import { DepositsQuery } from "@/lib/subgraph/deposits"
import { GraphQLClient } from "graphql-request"
import { NextApiRequest } from "next"
import { isAddress } from "viem"

// TODO: Use the "production" subgraph url here when not in development mode.
const client = new GraphQLClient("http://localhost:8000/subgraphs/name/uniswap/staking", {
  fetch
})

export async function GET(request: NextApiRequest) {
  const accountParam = request.query.account

  if (typeof accountParam !== "string" || !isAddress(accountParam)) {
    return new Response(null, { status: 400 })
  }

  const { deposits, account } = await client.request({
    document: DepositsQuery,
    variables: {
      account: accountParam,
      accountId: accountParam
    }
  })

  if (!account) {
    return Response.json({ deposits: [], currentlyStaked: 0 })
  }

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

  return Response.json({ deposits: parsedDeposits, currentlyStaked: account.currentlyStaked })
}

export const runtime = "edge"
