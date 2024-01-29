"use client"

import { QueryClientProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { WagmiProvider } from "@/components/providers/wagmi-provider"
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
