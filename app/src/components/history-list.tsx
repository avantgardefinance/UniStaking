"use client"

import { GetHistoryResponse } from "@/app/api/history/route"
import { HistoryCard, HistoryItem } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
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
  const parsedData: GetHistoryResponse =
    data?.map((event: any) => {
      return {
        ...event,
        amount: event.amount === undefined ? undefined : BigInt(event.amount),
        date: new Date(event.date * 1000)
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

  return <List items={data} />
}

function useList({ items }: { items: HistoryItem[] }) {
  const initialItems = 20
  const [historyToDisplay, setHistoryToDisplaya] = useState(items.slice(0, initialItems))

  const canLoadMore = historyToDisplay.length < items.length

  const loadMoreItems = 10
  const loadMore = () => {
    setHistoryToDisplaya(items.slice(0, historyToDisplay.length + loadMoreItems))
  }

  return { historyToDisplay, canLoadMore, loadMore }
}

function List({ items }: { items: HistoryItem[] }) {
  const { historyToDisplay, canLoadMore, loadMore } = useList({ items })

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
