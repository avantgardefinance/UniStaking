import { createTransactionMachine } from "@/lib/machines/transaction-machine"
import { type QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMachine } from "@xstate/react"
import { ReactNode, createContext, useContext } from "react"
import { Hex } from "viem"
import { ActorRef, assign, setup, stopChild } from "xstate"

type TransactionsManagerContextValues = {
  monitorTransaction: (txHash: Hex) => void
}

const TransactionsManagerContext = createContext<TransactionsManagerContextValues | undefined>(undefined)

const transactionsManagerMachine = setup({
  actions: {
    monitorTransaction: assign({
      transactionsRefs: ({ spawn, event, context }) => {
        const machine = createTransactionMachine({ client: event.client, txHash: event.txHash })
        // https://stately.ai/docs/spawn#spawn-and-typescript in docs types for spawn are coming soon...
        // @ts-ignore
        const ref = spawn(machine, { id: `transaction-${event.txHash}` }) as ActorRef<any, any>

        return [ref, ...context.transactionsRefs]
      }
    })
  },
  types: {
    events: {} as { type: "monitorTransaction"; txHash: Hex; client: QueryClient },
    context: {} as {
      transactionsRefs: ActorRef<any, any>[]
    }
  }
}).createMachine({
  id: "transactionsManager",
  initial: "initial",
  context: {
    transactionsRefs: []
  },
  states: {
    initial: {
      on: {
        monitorTransaction: {
          actions: "monitorTransaction"
        }
      }
    },
    end: {
      entry: [
        ({ context }) => {
          for (const ref of context.transactionsRefs) {
            stopChild(ref)
          }
        }
      ]
    }
  }
})

export function useTransactionsManager() {
  const context = useContext(TransactionsManagerContext)

  if (context === undefined) {
    throw new Error("Missing transaction manager context")
  }

  return context
}

export function TransactionsManagerProvider({
  children
}: {
  children?: ReactNode
}) {
  const client = useQueryClient()

  const [_, send] = useMachine(transactionsManagerMachine)

  function monitorTransaction(txHash: Hex) {
    send({ type: "monitorTransaction", txHash, client })
  }

  return (
    <TransactionsManagerContext.Provider
      value={{
        monitorTransaction
      }}
    >
      {children}
    </TransactionsManagerContext.Provider>
  )
}
