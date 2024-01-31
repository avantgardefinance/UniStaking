import { StakeCards } from "@/components/stake-cards"
import { StakedAmountsTable } from "@/components/staked-amounts-table"

export default function IndexPage() {
  return (
    <section className="space-y-6">
      <StakeCards totalStakedUni={18n} rewardsWeth={20n ** 10n} availableForStakingUni={10n ** 10n} />
      <StakedAmountsTable />
    </section>
  )
}
