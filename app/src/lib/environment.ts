import { mainnet } from "wagmi/chains"

export const isServer = typeof window === "undefined"
export const isBrowser = !isServer

const vercelEnv = process.env.VERCEL_ENV ?? "development"
export const isDevelopment = vercelEnv === "development"
export const isProduction = vercelEnv === "production"
export const isPreview = vercelEnv === "preview"

export const rpcUrl = (() => {
  if (isServer && isDevelopment) {
    return "http://localhost:8545"
  }

  if (isServer) {
    const alchemyKey = process.env.ALCHEMY_API_KEY
    if (alchemyKey === undefined) {
      throw new Error("Missing `ALCHEMY_API_KEY` environment variable")
    }

    return `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`
  }

  return `${window.location.origin}/rpc`
})()

export const chain = !isDevelopment ? mainnet : {
  ...mainnet,
  name: "Local",
  id: 31337
}
