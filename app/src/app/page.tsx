import { FAQ } from "@/components/FAQ"
import { StakeCards } from "@/components/stake-cards"
import { StakedAmounts } from "@/components/staked-amounts"

export default function IndexPage() {
  return (
    <div className="space-y-4">
      <section>
        <StakeCards totalStakedUni={18n} rewardsWeth={20n ** 10n} />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <StakedAmounts />
      </section>
    </div>
  )
}
