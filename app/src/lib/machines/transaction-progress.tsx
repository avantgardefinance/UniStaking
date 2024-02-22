import { never } from "@/lib/assertion"
import { PartyPopper, RotateCw } from "lucide-react"
import { ReactNode } from "react"

export function getTransactionProgress({
  machineState,
  initialButtonContent
}: { machineState: "confirmed" | "initial" | "sending" | "sent"; initialButtonContent: ReactNode }) {
  switch (machineState) {
    case "initial":
      return {
        value: 0,
        buttonContent: initialButtonContent,
        progressDescription: null
      }
    case "sending":
      return {
        value: 33,
        buttonContent: (
          <>
            <RotateCw size={16} className="mr-2 size-4 animate-spin" />
            <span>Sending</span>
          </>
        ),
        progressDescription: <span>Confirm transaction in your wallet</span>
      }
    case "sent":
      return {
        value: 66,
        buttonContent: (
          <>
            <RotateCw size={16} className="mr-2 size-4 animate-spin" />
            <span>Confirming</span>
          </>
        ),
        progressDescription: <span>Transaction sent, waiting for confirmation...</span>
      }
    case "confirmed":
      return {
        value: 100,
        buttonContent: initialButtonContent,
        progressDescription: (
          <span className="space-x-2 flex flex-row items-baseline">
            <span>Transaction confirmed!</span>
            <PartyPopper size={16} />
          </span>
        )
      }
    default:
      never(machineState, `Unhandled value for progress ${machineState}`)
  }
}
