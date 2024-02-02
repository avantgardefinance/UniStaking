import { StakeCards } from "@/components/stake-cards"

export default function IndexPage() {
  return (
    <section>
      <StakeCards totalStakedUni={18n} rewardsWeth={20n ** 10n} />
    </section>
  )
}
