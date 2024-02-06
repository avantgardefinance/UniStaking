import { FAQ } from "@/components/faq"
import { StakeCards } from "@/components/stake-cards"
import { StakedAmounts } from "@/components/staked-amounts"

export default function IndexPage() {
  return (
    <div className="space-y-6">
      <section>
        <StakeCards totalStakedUni={18n} rewardsWeth={20n ** 10n} />
      </section>
      <section>
        <StakedAmounts />
      </section>
      <section>
        <FAQ />
      </section>
    </div>
  )
}
