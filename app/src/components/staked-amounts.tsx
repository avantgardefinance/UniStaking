"use client"
import { StakePositionCard, type StakePositionCardProps } from "@/components/stake-position-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import dayjs from "dayjs"

function useStakedAmounts() {
  const positions: Array<StakePositionCardProps> = [
    {
      stakeId: 1n,
      stakedAmount: 100n,
      createdAt: dayjs(),
      updatedAt: dayjs(),
      owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      delegatee: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    {
      stakeId: 2n,
      stakedAmount: 100n,
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

  const isEmpty = positions.length === 0
  return { positions, isEmpty }
}

export function StakedAmounts() {
  const { isEmpty, positions } = useStakedAmounts()

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Staked Amounts</h2>
      <div className="flex flex-row flex-wrap gap-8">
        {isEmpty && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                No staked positions
              </CardTitle>
            </CardHeader>
          </Card>
        )}
        {positions.map((position) => <StakePositionCard key={position.stakeId} {...position} />)}
      </div>
    </div>
  )
}
