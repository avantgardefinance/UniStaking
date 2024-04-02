"use client"

import { AccountDepositsSchema } from "@/app/api/deposits/model"
import { StakeCards } from "@/components/stake-cards"
import { StakedAmounts } from "@/components/staked-amounts"
import { governanceToken } from "@/lib/consts"
import { withAccount } from "@/lib/hocs/with-account"
import { Schema } from "@effect/schema"
import { useQuery } from "@tanstack/react-query"
import type { Address } from "viem"
import { useBalance } from "wagmi"

const decode = Schema.decodeSync(AccountDepositsSchema)

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

      return decode(await response.json())
    }
  })

  const {
    data: governanceTokenBalance,
    error: errorGovernanceTokenBalance,
    isLoading: isLoadingGovernanceTokenBalance
  } = useBalance({
    address: account,
    token: governanceToken
  })

  const isEmpty = depositsData?.deposits.length === 0
  return {
    deposits: depositsData?.deposits ?? [],
    isEmpty,
    currentlyStaked: depositsData?.total ?? BigInt(0),
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
