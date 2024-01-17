"use client"

import { QueryClientProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { WagmiProvider } from "./wagmi-provider"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <WagmiProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
