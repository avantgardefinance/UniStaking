import { invariant } from "@/lib/assertion"
import { BlockNumberQuery } from "@/lib/subgraph/block-number"
import { Schema } from "@effect/schema"
import { GraphQLClient } from "graphql-request"
import { SubgraphBlockNumberSchema } from "./model"

const encode = Schema.encodeSync(SubgraphBlockNumberSchema)

const client = new GraphQLClient("https://api.thegraph.com/subgraphs/name/enzymefinance/uni-staking-sepolia", {
  fetch
})

export async function GET() {
  const { _meta } = await client.request({
    document: BlockNumberQuery
  })

  const blockNumber = _meta?.block?.number

  invariant(blockNumber !== undefined, "Block number not found")

  return Response.json(encode(blockNumber))
}

export const runtime = "edge"
