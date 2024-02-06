import { StakePositionCard, type StakePositionCardProps } from "@/components/stake-position-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

function useStakedAmounts() {
  const positions: Array<StakePositionCardProps> = []

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
