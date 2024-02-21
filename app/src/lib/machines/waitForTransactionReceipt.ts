import { config } from "@/components/providers/wagmi-provider"
import { Hex, ReplacementReason } from "viem"
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
        confirmations: 1,
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
