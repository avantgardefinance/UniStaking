import { isServer } from "@/lib/environment"
import { cache } from "react"
import { createPublicClient, http } from "viem"

const alchemyPrefix = {
  1: "eth-mainnet",
  137: "polygon-mainnet"
} as const

function alchemyUrl(chain: keyof typeof alchemyPrefix) {
  const alchemyKey = process.env.ALCHEMY_API_KEY
  if (alchemyKey === undefined) {
    throw new Error("Missing `ALCHEMY_API_KEY` environment variable")
  }

  return `https://${alchemyPrefix[chain]}.alchemyapi.io/v2/${alchemyKey}`
}

function originUrl(chain: keyof typeof alchemyPrefix | 1337) {
  return `${window.location.origin}/rpc/${chain}`
}

export function getRpcUrl(chain: number) {
  if (chain === 1 || chain === 137) {
    return isServer ? alchemyUrl(chain) : originUrl(chain)
  }

  if (chain === 1337) {
    return isServer ? "http://0.0.0.0:8545" : originUrl(chain)
  }

  return undefined
}

export const getPublicClient = cache(function getPublicClient(chain: number) {
  return createPublicClient({
    transport: http(getRpcUrl(chain)),
    batch: {
      multicall: {
        wait: 1
      }
    }
  })
})
