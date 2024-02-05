import { buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { never } from "@/lib/assertion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect } from "react"
import type { Hash } from "viem"
import type { UseWriteContractReturnType } from "wagmi"

export function useTransactionToast(
  { status, txHash }: { status: UseWriteContractReturnType["status"]; txHash?: Hash }
) {
  const { toast } = useToast()

  useEffect(() => {
    const action = txHash === undefined ? undefined : (
      <Link href={`https://etherscan.io/tx/${txHash}`} target="_blank">
        <div
          className={cn(
            "space-x-2",
            buttonVariants({
              variant: "outline"
            })
          )}
        >
          Transaction {txHash.slice(0, 10)}...
        </div>
      </Link>
    )

    switch (status) {
      case "success":
        toast({ title: "Success", action })
        break
      case "pending":
        toast({ title: "Pending ...", action })
        break
      case "idle":
        toast({ title: "Idle", action })
        break
      case "error":
        toast({ title: "Failed", action, variant: "destructive" })
        break
      default:
        never(status, "Unhandled state")
    }
  }, [status, toast, txHash])
}
