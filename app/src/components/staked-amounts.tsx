"use client"

import type { Deposits } from "@/app/api/deposits/model"
import { StakeDepositCard } from "@/components/stake-deposit-card"
import { Alert } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { ReactNode } from "react"
import type { Address } from "viem"

interface Props {
  deposits: Deposits
  error?: Error
  governanceTokenBalance: { value: bigint } | undefined
  isEmpty: boolean
  isLoading: boolean
  account: Address
}

export function StakedAmounts(props: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Staked Amounts</h2>
      <div className="flex flex-row flex-wrap gap-8">
        <StakedAmountsContent {...props} />
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

function StakedAmountsContent({ deposits, error, governanceTokenBalance, isEmpty, isLoading, account }: Props) {
  if (isLoading) {
    return (
      <>
        <CardWithTitle>
          <div className="flex flex-row">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="w-full h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
            </div>
          </div>
        </CardWithTitle>
        <CardWithTitle>
          <div className="flex flex-row">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="w-full h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
            </div>
          </div>
        </CardWithTitle>
      </>
    )
  }

  if (error) {
    return (
      <CardWithTitle>
        <Alert variant="destructive">Error</Alert>
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
          <StakeDepositCard
            account={account}
            deposit={deposit}
            governanceTokenBalanceValue={governanceTokenBalance.value}
          />
        </div>
      ))}
    </>
  )
}
