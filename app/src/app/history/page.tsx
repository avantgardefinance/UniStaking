"use client"

import { HistoryList } from "@/components/history-list"
import { withAccount } from "@/lib/hocs/with-account"
import { History } from "lucide-react"
import type { Address } from "viem"

function HistoryPage({ account }: { account: Address }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold flex flex-row space-x-2 items-center">
        <History size={24} /> <span>History</span>
      </h1>
      <HistoryList account={account} />
    </div>
  )
}

export default withAccount(HistoryPage)
