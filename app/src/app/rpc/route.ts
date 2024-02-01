import { rpcUrl } from "@/lib/environment"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  if (!req.body) {
    return new Response(undefined, { status: 404 })
  }

  // TODO: Only allow selected methods and only allow calls to contracts used in the app.
  return await fetch(rpcUrl, {
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
