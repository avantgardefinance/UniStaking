import { useTransactionToast } from "@/lib/hooks/useTransactionToast"
import type { Abi } from "viem"
import { useContractWrite, type UseContractWriteConfig } from "wagmi"

type WriteContractMode = "prepared" | undefined

export function useContractWriteWithToast<
  TAbi extends Abi | ReadonlyArray<unknown>,
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(config: UseContractWriteConfig<TAbi, TFunctionName, TMode>) {
  const result = useContractWrite(config)

  useTransactionToast({ status: result.status, txHash: result.data?.hash })

  return result
}
