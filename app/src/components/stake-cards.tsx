import { AvailableUniForStaking } from "@/components/stake-card-available-uni"
import { StakeCardRewards } from "@/components/stake-card-rewards"
import { StakeCardTotalStaked } from "@/components/stake-card-total-staked"

export function StakeCards(props: {
  currentlyStaked?: bigint
  isLoadingTotalStaked: boolean
  errorTotalStaked?: Error
  availableForStakingUni?: bigint
  isLoadingAvailableForStaking: boolean
  errorAvailableForStaking?: Error
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Stake</h2>
      <div className="flex flex-row flex-wrap gap-8">
        <StakeCardTotalStaked
          currentlyStaked={props.currentlyStaked}
          isLoading={props.isLoadingTotalStaked}
          error={props.errorTotalStaked}
        />
        <StakeCardRewards />
        <AvailableUniForStaking
          isLoading={props.isLoadingAvailableForStaking}
          error={props.errorAvailableForStaking}
          availableForStakingUni={props.availableForStakingUni}
        />
      </div>
    </div>
  )
}
