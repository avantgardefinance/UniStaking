import { baseSepolia } from "wagmi/chains"

export const isServer = typeof window === "undefined"
export const isBrowser = !isServer

const vercelEnv = process.env.VERCEL_ENV ?? "development"
export const isPreview = vercelEnv === "preview"

export const rpcUrl = (() => {
  if (isBrowser) {
    return `${window.location.origin}/rpc`
  }

  const alchemyKey = process.env.ALCHEMY_API_KEY
  if (alchemyKey === undefined) {
    throw new Error("Missing `ALCHEMY_API_KEY` environment variable")
  }

  return `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`
})()

export const chain = baseSepolia
