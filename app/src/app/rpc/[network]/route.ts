import type { NextRequest } from "next/server"
import { getRpcUrl } from "../../../lib/rpc"

export async function POST(req: NextRequest, { params }: { params: { network: string } }) {
  const url = getRpcUrl(Number(params.network))
  if (!req.body || url === undefined) {
    return new Response(undefined, { status: 404 })
  }

  return await fetch(url, {
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
