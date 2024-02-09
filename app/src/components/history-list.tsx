"use client"

import { HistoryCard } from "@/components/history-card"
import type { HistoryItem } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import * as dayjs from "dayjs"
import { useState } from "react"
import { useAccount } from "wagmi"

function useHistoryListWrapper() {
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
        amount: event.amount === undefined ? undefined : BigInt(event.amount),
        date: dayjs.unix(event.date)
      }
    }) ?? []

  return {
    data: parsedData,
    error,
    isLoading
  }
}

export function HistoryListWrapper() {
  const { data, error, isLoading } = useHistoryListWrapper()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error !== null) {
    return <Alert variant="destructive">{error.message}</Alert>
  }

  return <HistoryList items={data} />
}

function useHistoryList({ items }: { items: HistoryItem[] }) {
  const [historyToDisplay, setHistoryToDisplaya] = useState(items.slice(0, 20))

  const canLoadMore = historyToDisplay.length < items.length

  const loadMore = () => {
    setHistoryToDisplaya(items.slice(0, historyToDisplay.length + 10))
  }

  return { historyToDisplay, canLoadMore, loadMore }
}

function HistoryList({ items }: { items: HistoryItem[] }) {
  const { historyToDisplay, canLoadMore, loadMore } = useHistoryList({ items })

  return (
    <div className="flex items-center flex-col space-y-4">
      <div className="w-full space-y-4">
        {historyToDisplay.map((item) => (
          <HistoryCard key={item.id} {...item} />
        ))}
      </div>
      {canLoadMore && <Button onClick={loadMore}>Load more</Button>}
    </div>
  )
}
