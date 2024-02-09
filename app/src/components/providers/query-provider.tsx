"use client"

import { QueryClient, QueryClientProvider as QueryClientProviderBase } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000
        }
      }
    })
  })

  return <QueryClientProviderBase client={client}>{children}</QueryClientProviderBase>
}
