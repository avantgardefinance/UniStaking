"use client"

import { QueryClientProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { TransactionsManagerProvider } from "@/components/providers/transactions-manager-provider"
import { WagmiProvider } from "@/components/providers/wagmi-provider"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <QueryClientProvider>
        <WagmiProvider>
          <TransactionsManagerProvider>{children}</TransactionsManagerProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
