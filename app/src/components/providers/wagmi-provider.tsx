"use client"

import "@rainbow-me/rainbowkit/styles.css"
import { walletConnectProjectId } from "@/lib/consts"
import { chain, rpcUrl } from "@/lib/environment"
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import type { ReactNode } from "react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const { chains, publicClient } = configureChains([chain], [jsonRpcProvider({
  rpc: ({ id }) => (id === chain.id) ? { http: rpcUrl } : null
})])

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
