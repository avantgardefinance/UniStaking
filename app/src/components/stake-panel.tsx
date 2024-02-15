"use client"

import { StakeCards } from "@/components/stake-cards"
import { StakeDeposit } from "@/components/stake-deposit-card"
import { StakedAmounts } from "@/components/staked-amounts"
import { governanceToken } from "@/lib/consts"
import { withAccount } from "@/lib/hocs/withAccount"
import { useQuery } from "@tanstack/react-query"
import { Address } from "viem"
import { useBalance } from "wagmi"

function useStakePanel(account: Address) {
  const {
    data: depositsData,
    error: errorDeposits,
    isLoading: isLoadingDeposits
  } = useQuery({
    queryKey: ["deposits", account],
    queryFn: async () => {
      const response = await fetch(`/api/deposits?account=${account}`)

      if (!response.ok) {
        throw new Error("Failed to fetch deposits")
      }

      return response.json()
    }
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
  } = useBalance({
    address: account,
    token: governanceToken
  })

  const isEmpty = parsedDeposits.length === 0
  return {
    deposits: parsedDeposits,
    isEmpty,
    currentlyStaked,
    governanceTokenBalance,
    errorGovernanceTokenBalance: errorGovernanceTokenBalance ?? undefined,
    errorDeposits: errorDeposits ?? undefined,
    isLoadingGovernanceTokenBalance,
    isLoadingDeposits
  }
}

function Panel({ account }: { account: Address }) {
  const {
    currentlyStaked,
    deposits,
    errorDeposits,
    isEmpty,
    governanceTokenBalance,
    errorGovernanceTokenBalance,
    isLoadingDeposits,
    isLoadingGovernanceTokenBalance
  } = useStakePanel(account)

  return (
    <>
      <section>
        <StakeCards
          currentlyStaked={currentlyStaked}
          availableForStakingUni={governanceTokenBalance?.value}
          isLoadingAvailableForStaking={isLoadingGovernanceTokenBalance}
          errorAvailableForStaking={errorGovernanceTokenBalance ?? undefined}
          isLoadingTotalStaked={isLoadingDeposits}
          errorTotalStaked={errorDeposits}
          account={account}
        />
      </section>
      <section>
        <StakedAmounts
          account={account}
          deposits={deposits}
          error={errorGovernanceTokenBalance ?? errorDeposits}
          governanceTokenBalance={governanceTokenBalance}
          isEmpty={isEmpty}
          isLoading={isLoadingDeposits ?? isLoadingGovernanceTokenBalance}
        />
      </section>
    </>
  )
}

export const StakePanel = withAccount(Panel)
