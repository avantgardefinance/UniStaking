"use client"

import { GetHistoryResponse } from "@/app/api/history/route"
import { HistoryCard, HistoryItem } from "@/components/history-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
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

function useList(items: HistoryItem[]) {
  const initialLimit = 20
  const [limit, setLimit] = useState(initialLimit)

  const canShowMore = limit < items.length

  const showMoreItems = 10
  const showMore = () => {
    setLimit(limit + showMoreItems)
  }

  const historyToDisplay = useMemo(() => items.slice(0, limit), [items, limit])

  const account = useAccount()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setLimit(initialLimit)
  }, [account.address])

  return { historyToDisplay, canShowMore: canShowMore, showMore }
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
