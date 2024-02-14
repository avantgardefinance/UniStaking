import { AvailableUniForStaking } from "@/components/stake-card-available-uni"
import { StakeCardRewards } from "@/components/stake-card-rewards"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

export function StakeCards({
  totalStakedUni
}: {
  totalStakedUni: bigint
  rewardsWeth: bigint
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Stake</h2>
      <div className="flex flex-row flex-wrap gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardDescription className="text-base font-medium">Total Staked</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="space-x-2">
              <span className="text-2xl font-semibold">
                <BigIntDisplay value={totalStakedUni} decimals={18} precision={2} />
              </span>
              <span className="text-xl">UNI</span>
            </h3>
          </CardContent>
        </Card>
        <StakeCardRewards />
        <AvailableUniForStaking />
      </div>
    </div>
  )
}
