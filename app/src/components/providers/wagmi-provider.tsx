"use client"

import { walletConnectProjectId } from "@/lib/consts"
import { chain, rpcUrl } from "@/lib/environment"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import type { ReactNode } from "react"
import { createConfig, http, WagmiProvider as WagmiProviderBase } from "wagmi"

const config = createConfig(getDefaultConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(rpcUrl)
  },
  walletConnectProjectId,
  // TODO: Fill in proper values for these.
  appName: "Uniswap Staking",
  appDescription: "Uniswap Staking",
  appUrl: "https://family.co", // your app's url
  appIcon: "https://family.co/logo.png" // your app's icon, no bigger than 1024x1024px (max. 1MB)
}))

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProviderBase config={config}>
      {/* TODO: Remove this configuration once https://github.com/family/connectkit/issues/340 is resolved. */}
      <ConnectKitProvider options={{ enforceSupportedChains: false }}>
        {children}
      </ConnectKitProvider>
    </WagmiProviderBase>
  )
}
