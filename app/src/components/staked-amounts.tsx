"use client"

import { StakeDepositCard } from "@/components/stake-deposit-card"
import type { StakeDeposit } from "@/components/stake-deposit-card"
import { Alert } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useGovernanceTokenBalance } from "@/lib/hooks/use-governance-token-balance"
import { useQuery } from "@tanstack/react-query"
import { ReactNode } from "react"
import { useAccount } from "wagmi"

function useStakedAmounts() {
  const account = useAccount()

  const {
    data: deposits,
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
    deposits?.map((deposit: any) => {
      return {
        ...deposit,
        createdAt: new Date(deposit.createdAt * 1000),
        updatedAt: new Date(deposit.updatedAt * 1000)
      }
    }) ?? []

  const {
    data: governanceTokenBalance,
    error: errorGovernanceTokenBalance,
    isLoading: isLoadingGovernanceTokenBalance
  } = useGovernanceTokenBalance()

  const isEmpty = parsedDeposits.length === 0
  return {
    deposits: parsedDeposits,
    isEmpty,
    governanceTokenBalance,
    error: errorGovernanceTokenBalance ?? errorDeposits,
    isLoading: isLoadingGovernanceTokenBalance ?? isLoadingDeposits
  }
}

export function StakedAmounts() {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Staked Amounts</h2>
      <div className="flex flex-row flex-wrap gap-8">
        <StakedAmountsContent />
      </div>
    </div>
  )
}

function CardWithTitle({ children }: { children: ReactNode }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{children}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function StakedAmountsContent() {
  const { deposits, error, governanceTokenBalance, isEmpty, isLoading } = useStakedAmounts()

  if (isLoading) {
    return <CardWithTitle>Loading...</CardWithTitle>
  }

  if (error !== null) {
    return (
      <CardWithTitle>
        <Alert variant="destructive">{error.message}</Alert>
      </CardWithTitle>
    )
  }

  if (governanceTokenBalance === undefined) {
    return <CardWithTitle>Not available</CardWithTitle>
  }

  if (isEmpty) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No deposits</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      {/*TODO improve types*/}
      {deposits.map((deposit: any) => (
        <div key={deposit.stakeId} className="w-full">
          <StakeDepositCard deposit={deposit} governanceTokenBalanceValue={governanceTokenBalance.value} />
        </div>
      ))}
    </>
  )
}
