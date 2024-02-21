import { never } from "@/lib/assertion"
import { Download, PartyPopper, RotateCw } from "lucide-react"

export function getPermitAndStakeProgress(
  machineState: "confirmed" | "initial" | "signing" | "sending" | "signed" | "sent"
) {
  switch (machineState) {
    case "initial":
      return {
        value: 0,
        buttonContent: (
          <>
            <Download size={16} />
            <span>Permit & Stake</span>
          </>
        ),
        progressDescription: null
      }
    case "signing":
      return {
        value: 20,
        buttonContent: (
          <>
            <RotateCw size={16} className="mr-2 size-4 animate-spin" />
            <span>Signing</span>
          </>
        ),
        progressDescription: <span>Sign transaction in your wallet</span>
      }
    case "signed":
      return {
        value: 40,
        buttonContent: (
          <>
            <Download size={16} />
            <span>Stake</span>
          </>
        ),
        progressDescription: <span>Transaction signed, send to stake</span>
      }
    case "sending":
      return {
        value: 60,
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
        value: 80,
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
        buttonContent: (
          <>
            <Download size={16} />
            <span>Permit & Stake</span>
          </>
        ),
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
