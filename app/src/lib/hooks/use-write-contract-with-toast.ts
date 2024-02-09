import { useTransactionToast } from "@/lib/hooks/use-transaction-toast"
import { useWriteContract } from "wagmi"
import type { Config, ResolvedRegister, UseWriteContractParameters, UseWriteContractReturnType } from "wagmi"

export function useWriteContractWithToast<config extends Config = ResolvedRegister["config"], context = unknown>(
  parameters: UseWriteContractParameters<config, context> = {}
): UseWriteContractReturnType<config, context> {
  const result = useWriteContract(parameters)
  useTransactionToast({ status: result.status, txHash: result.data })

  return result
}
