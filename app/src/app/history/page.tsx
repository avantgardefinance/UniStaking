import { HistoryList } from "@/components/history-list"
import { History } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl	font-semibold flex flex-row space-x-2 items-center">
        <History size={24} /> <span>History</span>
      </h1>
      <HistoryList />
    </div>
  )
}
