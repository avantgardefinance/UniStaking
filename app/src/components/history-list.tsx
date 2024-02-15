"use client"

import { GetHistoryResponse } from "@/app/api/history/route"
import { HistoryCard, HistoryItem } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Address } from "viem"

function useHistoryList({ account }: { account: Address }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["history", account],
    queryFn: async () => {
      const response = await fetch(`/api/history?account=${account}`)
      if (!response.ok) {
        throw new Error("Failed to fetch history")
      }
      return response.json()
    }
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

export function HistoryList({ account }: { account: Address }) {
  const { data, error, isLoading } = useHistoryList({ account })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error !== null) {
    return <Alert variant="destructive">{error.message}</Alert>
  }

  if (data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No history</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return <List key={account} items={data} />
}

function useList(items: HistoryItem[]) {
  const [limit, setLimit] = useState(20)

  return {
    historyToDisplay: items.slice(0, limit),
    canShowMore: limit < items.length,
    showMore: () => setLimit(limit + 10)
  }
}

function List({ items }: { items: HistoryItem[] }) {
  const { historyToDisplay, canShowMore, showMore } = useList(items)

  return (
    <div className="flex items-center flex-col space-y-4">
      <div className="w-full space-y-4">
        {historyToDisplay.map((item) => (
          <HistoryCard key={item.id} {...item} />
        ))}
      </div>
      {canShowMore && <Button onClick={showMore}>Load more</Button>}
    </div>
  )
}
