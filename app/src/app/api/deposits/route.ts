import { AccountDepositsSchema } from "@/app/api/deposits/model"
import { DepositsQuery } from "@/lib/subgraph/deposits"
import { Schema } from "@effect/schema"
import { GraphQLClient } from "graphql-request"
import type { NextRequest } from "next/server"
import { isAddress } from "viem"

const encode = Schema.encodeSync(AccountDepositsSchema)
const client = new GraphQLClient("https://api.thegraph.com/subgraphs/name/enzymefinance/uni-staking-sepolia", {
  fetch
})

export async function GET(request: NextRequest) {
  const account = request.nextUrl.searchParams.get("account") || ""
  if (!isAddress(account)) {
    return new Response(null, { status: 400 })
  }

  const response = await client.request({
    document: DepositsQuery,
    variables: {
      account,
      accountId: account
    }
  })

  const deposits = (response.deposits ?? []).map((deposit) => ({
    stakeId: deposit.id,
    stakedAmount: BigInt(deposit.amount),
    createdAt: new Date(deposit.createdAt * 1000),
    updatedAt: new Date(deposit.updatedAt * 1000),
    owner: deposit.owner.id,
    delegatee: deposit.delegatee.id,
    beneficiary: deposit.beneficiary.id
  }))

  return Response.json(
    encode({
      deposits,
      total: BigInt(response.account?.currentlyStaked ?? 0)
    })
  )
}

export const runtime = "edge"
