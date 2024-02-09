"use client"

import { HistoryCard } from "@/components/history-card"
import type { HistoryItem } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { useQuery } from "@tanstack/react-query"
import * as dayjs from "dayjs"
import { useAccount } from "wagmi"

function useHistoryList() {
  const account = useAccount()

  const { data, error, isLoading } = useQuery({
    queryKey: ["history", account.address],
    queryFn: async () => {
      const response = await fetch(`/api/history?account=${account.address}`)
      return response.json()
    },
    enabled: account.address !== undefined
  })

  // TODO improve types
  const parsedData: Array<HistoryItem> =
    data?.map((event: any) => {
      return {
        ...event,
        amount: BigInt(event.amount),
        date: dayjs.unix(event.date)
      }
    }) ?? []

  return {
    data: parsedData,
    error,
    isLoading
  }
}

export function HistoryList() {
  const { data, error, isLoading } = useHistoryList()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error !== null) {
    return <Alert variant="destructive">{error.message}</Alert>
  }

  return data.map((item) => <HistoryCard key={item.id} {...item} />)
}
