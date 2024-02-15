"use client"

import { StakeCards } from "@/components/stake-cards"
import { StakeDeposit } from "@/components/stake-deposit-card"
import { StakedAmounts } from "@/components/staked-amounts"
import { useGovernanceTokenBalance } from "@/lib/hooks/use-governance-token-balance"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

function useStakePanel() {
  const account = useAccount() // TODO: move this on top of the app

  const {
    data: depositsData,
    error: errorDeposits,
    isLoading: isLoadingDeposits
  } = useQuery({
    queryKey: ["deposits", account.address],
    queryFn: async () => {
      const response = await fetch(`/api/deposits?account=${account.address}`)
      return response.json()
    },
    enabled: account.address !== undefined
  })

  // TODO improve types
  const parsedDeposits: Array<StakeDeposit> =
    depositsData?.deposits.map((deposit: any) => {
      return {
        ...deposit,
        createdAt: new Date(deposit.createdAt * 1000),
        updatedAt: new Date(deposit.updatedAt * 1000)
      }
    }) ?? []

  const currentlyStaked: bigint | undefined =
    depositsData === undefined ? undefined : BigInt(depositsData.currentlyStaked)

  const {
    data: governanceTokenBalance,
    error: errorGovernanceTokenBalance,
    isLoading: isLoadingGovernanceTokenBalance
  } = useGovernanceTokenBalance()

  const isEmpty = parsedDeposits.length === 0
  return {
    deposits: parsedDeposits,
    isEmpty,
    currentlyStaked,
    governanceTokenBalance,
    errorGovernanceTokenBalance,
    errorDeposits,
    isLoadingGovernanceTokenBalance,
    isLoadingDeposits
  }
}

export function StakePanel() {
  const {
    currentlyStaked,
    deposits,
    errorDeposits,
    isEmpty,
    governanceTokenBalance,
    errorGovernanceTokenBalance,
    isLoadingDeposits,
    isLoadingGovernanceTokenBalance
  } = useStakePanel()

  return (
    <>
      <section>
        <StakeCards
          currentlyStaked={currentlyStaked}
          availableForStakingUni={governanceTokenBalance?.value}
          isLoadingAvailableForStaking={isLoadingGovernanceTokenBalance}
          errorAvailableForStaking={errorGovernanceTokenBalance}
          isLoadingTotalStaked={isLoadingDeposits}
          errorTotalStaked={errorDeposits}
        />
      </section>
      <section>
        <StakedAmounts
          deposits={deposits}
          error={errorDeposits ?? errorGovernanceTokenBalance}
          governanceTokenBalance={governanceTokenBalance}
          isEmpty={isEmpty}
          isLoading={isLoadingDeposits ?? isLoadingGovernanceTokenBalance}
        />
      </section>
    </>
  )
}
