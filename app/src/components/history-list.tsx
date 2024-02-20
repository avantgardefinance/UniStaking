"use client"

import { History, HistorySchema } from "@/app/api/history/model"
import { HistoryCard } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Schema } from "@effect/schema"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Address } from "viem"

const decode = Schema.decodeSync(HistorySchema)

function useHistoryList({ account }: { account: Address }) {
  return useQuery({
    queryKey: ["history", account],
    queryFn: async () => {
      const response = await fetch(`/api/history?account=${account}`)
      if (!response.ok) {
        throw new Error("Failed to fetch history")
      }

      return decode(await response.json())
    }
  })
}

export function HistoryList({ account }: { account: Address }) {
  const { data, error, isSuccess, isError, isLoading } = useHistoryList({ account })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <Alert variant="destructive">{error.message}</Alert>
  }

  if (isSuccess) {
    return data.length === 0 ? (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No history</CardTitle>
        </CardHeader>
      </Card>
    ) : (
      <List key={account} items={data} />
    )
  }

  return null
}

function useList(items: History) {
  const [limit, setLimit] = useState(20)

  return {
    historyToDisplay: items.slice(0, limit),
    canShowMore: limit < items.length,
    showMore: () => setLimit(limit + 10)
  }
}

function List({ items }: { items: History }) {
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
