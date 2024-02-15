import { FAQ } from "@/components/faq"
import { StakePanel } from "@/components/stake-panel"

export default function IndexPage() {
  return (
    <div className="space-y-6">
      <StakePanel />
      <section>
        <FAQ />
      </section>
    </div>
  )
}
