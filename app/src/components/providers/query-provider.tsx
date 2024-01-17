"use client"

import { QueryClient, QueryClientProvider as QueryClientProviderBase } from "@tanstack/react-query"
import type { ReactNode } from "react"

const client = new QueryClient()

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProviderBase client={client}>
      {children}
    </QueryClientProviderBase>
  )
}
