"use client"

import "@rainbow-me/rainbowkit/styles.css"
import { walletConnectProjectId } from "../../lib/consts"
import { getRpcUrl } from "../../lib/rpc"
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import type { ReactNode } from "react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const url = getRpcUrl(chain.id)
        if (url === undefined) {
          return null
        }

        return { http: url }
      }
    })
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Uniswap",
  projectId: walletConnectProjectId,
  chains
})

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors
})

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
