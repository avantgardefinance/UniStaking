import { StakePositionCard, type StakePositionCardProps } from "@/components/stake-position-card"

function useStakedAmounts() {
  const positions: Array<StakePositionCardProps> = []
  return { positions }
}

export function StakedAmounts() {
  const { positions } = useStakedAmounts()

  return (
    <div>
      <h2 className="text-3xl font-bold">Stake</h2>
      <div className="flex flex-row flex-wrap gap-8">
        {positions.map((position) => <StakePositionCard key={position.stakeId} {...position} />)}
      </div>
    </div>
  )
}
