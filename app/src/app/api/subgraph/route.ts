import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  if (!req.body) {
    return new Response(undefined, { status: 404 })
  }

  // TODO: Use the "production" subgraph url here when not in development mode.
  return await fetch("http://localhost:8000/subgraphs/name/uniswap/staking", {
    method: "POST",
    body: req.body,
    // @ts-ignore
    duplex: "half",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const runtime = "edge"
