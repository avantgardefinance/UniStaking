import { rpcUrl } from "@/lib/environment"
import type { NextRequest } from "next/server"

export function POST(req: NextRequest) {
  if (!req.body) {
    return new Response(undefined, { status: 404 })
  }

  return fetch(rpcUrl, {
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
