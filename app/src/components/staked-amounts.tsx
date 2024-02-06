"use client"

import { StakePositionCard } from "@/components/stake-position-card"
import type { StakePosition } from "@/components/stake-position-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useGovernanceTokenBalance } from "@/lib/hooks/use-governance-token-balance"
import dayjs from "dayjs"

function useStakedAmounts() {
  const positions: Array<StakePosition> = [
    {
      stakeId: 1n,
      stakedAmount: 100n,
      createdAt: dayjs(),
      updatedAt: dayjs(),
      owner: "0x1D12E5B92F5638d643C273F0dF2150D5AcC5e5d0",
      beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      delegatee: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    {
      stakeId: 2n,
      stakedAmount: 10n ** 18n,
      createdAt: dayjs(),
      updatedAt: dayjs(),
      owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      delegatee: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    {
      stakeId: 3n,
      stakedAmount: 100n,
      createdAt: dayjs(),
      updatedAt: dayjs(),
      owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      delegatee: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    }
  ]

  const { data: governanceTokenBalance, status: governanceTokenStatus } = useGovernanceTokenBalance()

  const isEmpty = positions.length === 0
  return { positions, isEmpty, governanceTokenBalance, governanceTokenStatus }
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

function CardWithTitle({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {children}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

function StakedAmountsContent() {
  const { governanceTokenBalance, governanceTokenStatus, isEmpty, positions } = useStakedAmounts()

  if (governanceTokenStatus === "pending") {
    return <CardWithTitle>Loading...</CardWithTitle>
  }

  if (governanceTokenStatus === "error") {
    return <CardWithTitle>Error</CardWithTitle>
  }

  if (governanceTokenBalance === undefined) {
    return <CardWithTitle>Not available</CardWithTitle>
  }

  if (isEmpty) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            No staked positions
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      {positions.map((position) => (
        <div key={position.stakeId} className="w-full">
          <StakePositionCard position={position} governanceTokenBalanceValue={governanceTokenBalance.value} />
        </div>
      ))}
    </>
  )
}
