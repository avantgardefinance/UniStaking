import { config } from "@/components/providers/wagmi-provider"
import { uniAbi } from "@/lib/abi/uni"
import { governanceToken, permitEIP712Options, timeToMakeTransaction, uniStaker } from "@/lib/consts"
import type { Address } from "viem"
import { readContract, signTypedData } from "wagmi/actions"
import { fromPromise } from "xstate"

export const signGovernanceTokenPermitActor = fromPromise(
  async ({ input: { signer, amount } }: { input: { signer: Address; amount: bigint } }) => {
    const nonce = await readContract(config, {
      address: governanceToken,
      abi: uniAbi,
      functionName: "nonces",
      args: [signer]
    })

    const deadline = BigInt(Number((new Date().getTime() / 1000).toFixed()) + timeToMakeTransaction)

    const signature = await signTypedData(config, {
      account: signer,
      types: permitEIP712Options.permitTypes,
      domain: {
        ...permitEIP712Options.domainBase,
        chainId: config.state.chainId
      },
      primaryType: permitEIP712Options.primaryType,
      message: {
        owner: signer,
        spender: uniStaker,
        value: amount,
        nonce: nonce,
        deadline
      }
    })

    return {
      signature,
      deadline
    }
  }
)
