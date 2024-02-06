import { governanceToken } from "@/lib/consts"
import { useAccount, useBalance } from "wagmi"

export function useGovernanceTokenBalance() {
  const { address } = useAccount()
  const { data, status } = useBalance({
    address,
    token: governanceToken
  })

  return { data, status }
}
