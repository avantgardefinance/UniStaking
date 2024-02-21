import { config } from "@/components/providers/wagmi-provider"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { invariant, never } from "@/lib/assertion"
import { uniStaker } from "@/lib/consts"
import { invalidateQueries } from "@/lib/machines/actions"
import { signGovernanceTokenPermitActor } from "@/lib/machines/signGovernanceTokenPermitActor"
import { TxEvent, waitForTransactionReceiptActor } from "@/lib/machines/waitForTransactionReceipt"
import { QueryClient } from "@tanstack/react-query"
import { Address, Hex, hexToSignature } from "viem"
import { writeContract } from "wagmi/actions"
import { assertEvent, assign, fromPromise, raise, setup } from "xstate"

const permitAndStakeMachine = setup({
  actors: {
    sign: signGovernanceTokenPermitActor,
    send: fromPromise(
      async ({
        input: { delegatee, beneficiary, amount, signature, deadline }
      }: {
        input: {
          amount: bigint
          delegatee: Address
          beneficiary: Address
          signature: Hex
          deadline: bigint
        }
      }) => {
        const { v, r, s } = hexToSignature(signature)

        const txHash = await writeContract(config, {
          address: uniStaker,
          abi: abiUniStaker,
          functionName: "permitAndStake",
          args: [amount, delegatee, beneficiary, deadline, Number(v), r, s]
        })
        return txHash
      }
    ),
    waitForTransactionReceipt: waitForTransactionReceiptActor
  },
  actions: {
    invalidateQueries
  },
  guards: {
    hasSignatureNotExpired: ({ context }) => {
      invariant(context.deadline !== undefined, "Deadline is not undefined")
      return new Date().getTime() / 1000 < Number(context.deadline)
    }
  },
  types: {
    context: {} as Partial<{
      signature: Hex
      deadline: bigint
      amount: bigint
      error: string
      delegatee: Address
      beneficiary: Address
      txHash: Hex
      client: QueryClient
    }>,
    events: {} as
      | { type: "sign"; amount: bigint; signer: Address; delegatee: Address; beneficiary: Address; client: QueryClient }
      | { type: "resend" }
      | TxEvent
  }
}).createMachine({
  id: "permitAndStake",
  initial: "initial",
  states: {
    initial: {
      on: {
        sign: {
          target: "signing",
          actions: assign(({ event }) => ({
            ...event,
            error: undefined
          }))
        }
      }
    },
    signing: {
      invoke: {
        id: "sign",
        src: "sign",
        input: ({ event }) => {
          assertEvent(event, "sign")

          return { amount: event.amount, signer: event.signer }
        },
        onDone: {
          target: "sending",
          actions: assign(({ event }) => ({
            signature: event.output.signature,
            deadline: event.output.deadline,
            error: undefined
          }))
        },
        onError: {
          target: "initial",
          actions: assign({ error: "Failed to sign the message" })
        }
      }
    },
    signed: {
      on: {
        resend: [
          {
            target: "sending",
            guard: "hasSignatureNotExpired",
            actions: assign({ error: undefined })
          },
          {
            target: "initial",
            actions: assign({ error: "Signature expired" })
          }
        ]
      }
    },
    sending: {
      invoke: {
        id: "send",
        src: "send",
        input: ({ context: { amount, deadline, signature, delegatee, beneficiary } }) => {
          invariant(
            delegatee !== undefined &&
              signature !== undefined &&
              deadline !== undefined &&
              beneficiary !== undefined &&
              amount !== undefined,
            "Invalid input"
          )
          return { delegatee, beneficiary, amount, signature, deadline }
        },
        onDone: {
          target: "sent",
          actions: assign(({ event }) => ({ error: undefined, txHash: event.output }))
        },
        onError: {
          target: "signed",
          actions: assign({ error: "Failed to send the message" })
        }
      }
    },
    sent: {
      on: {
        replaceTx: {
          target: "sent",
          actions: assign(({ event }) => ({ txHash: event.txHash }))
        },
        cancelTx: {
          target: "initial",
          actions: assign({ error: "Transaction was cancelled", txHash: undefined })
        },
        confirmTx: {
          target: "confirmed"
        }
      },
      invoke: {
        id: "waitForTransactionReceipt",
        src: "waitForTransactionReceipt",
        input: ({ context: { txHash } }) => {
          invariant(txHash !== undefined, "Invalid input")
          return txHash
        },
        onDone: {
          actions: raise(
            ({
              event: {
                output: { status, txHash }
              }
            }) => {
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
          )
        },
        onError: {
          target: "signed",
          actions: assign({ error: "Failed to send the message" })
        }
      }
    },
    confirmed: {
      entry: [
        {
          type: "invalidateQueries",
          params: ({ context }) => {
            invariant(context.client !== undefined, "Client is not undefined")
            return context.client
          }
        }
      ]
    }
  }
})
