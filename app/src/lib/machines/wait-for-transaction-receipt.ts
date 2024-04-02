import { config } from "@/components/providers/wagmi-provider"
import { never } from "@/lib/assertion"
import type { Hex, ReplacementReason } from "viem"
import { waitForTransactionReceipt } from "wagmi/actions"
import { fromPromise } from "xstate"

export const waitForTransactionReceiptActor = fromPromise(
  async ({
    input: txHash
  }: {
    input: Hex
  }) => {
    return new Promise<{ txHash: Hex; status: ReplacementReason | "confirmed" }>((resolve, reject) => {
      waitForTransactionReceipt(config, {
        hash: txHash,
        onReplaced: ({ transaction, reason }) => {
          resolve({ txHash: transaction.hash, status: reason })
        }
      })
        .then(() => resolve({ txHash, status: "confirmed" }))
        .catch((error) => reject(error))
    })
  }
)
export type TxEvent = { type: "confirmTx" } | { type: "cancelTx" } | { type: "replaceTx"; txHash: Hex }

export function getTxEvent({ status, txHash }: { status: ReplacementReason | "confirmed"; txHash: Hex }): TxEvent {
  switch (status) {
    case "confirmed":
      return { type: "confirmTx" }
    case "cancelled":
      return { type: "cancelTx" }
    case "replaced":
    case "repriced":
      return { type: "replaceTx", txHash }
    default:
      never(status, `Unhandled status for transaction receipt ${status}`)
  }
}
