import { SubgraphBlockNumberSchema } from "@/app/api/subgraph-block-number/model"
import { config } from "@/components/providers/wagmi-provider"
import { Schema } from "@effect/schema"
import { type QueryClient } from "@tanstack/react-query"
import { Hex } from "viem"
import { waitForTransactionReceipt } from "wagmi/actions"
import { fromPromise, setup } from "xstate"

const decode = Schema.decodeSync(SubgraphBlockNumberSchema)

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function createTransactionMachine({ client, txHash }: { client: QueryClient; txHash: Hex }) {
  return setup({
    actors: {
      monitorTransaction: fromPromise(() => {
        return new Promise<void>((resolve, reject) => {
          waitForTransactionReceipt(config, {
            hash: txHash,
            onReplaced: () => {
              reject()
            }
          }).then(async ({ blockNumber: transactionBlockNumber }) => {
            while (true) {
              const response = await fetch("/api/subgraph-block-number")
              if (response.ok) {
                const subgraphBlockNumber = decode(await response.json())
                if (subgraphBlockNumber >= transactionBlockNumber) {
                  client.invalidateQueries()
                  return resolve()
                }
                await wait(10_000) // 10 secs
              }
            }
          })
        })
      })
    }
  }).createMachine({
    initial: "initial",
    states: {
      initial: {
        invoke: {
          id: "monitorTransaction",
          src: "monitorTransaction",
          onDone: "end",
          onError: "end"
        }
      },
      end: {}
    }
  })
}
