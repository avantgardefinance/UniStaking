import { AvailableUniForStaking } from "@/components/stake-card-available-uni"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export function StakeCards(
  { rewardsWeth, totalStakedUni }: {
    totalStakedUni: bigint
    rewardsWeth: bigint
  }
) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">Stake</h2>
      <div className="flex flex-row flex-wrap gap-8">
        <Card className="grow">
          <CardHeader>
            <CardDescription className="text-base font-medium">Total Staked</CardDescription>
          </CardHeader>
          <CardContent className="space-x-2 text-2xl font-semibold">
            <h3 className="space-x-2">
              <BigIntDisplay value={totalStakedUni} decimals={18} />
              <span>UNI</span>
            </h3>
          </CardContent>
        </Card>
        <Card className="grow">
          <CardHeader>
            <CardDescription className="text-base font-medium">Rewards</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between space-x-2 text-2xl font-semibold">
            <h3 className="space-x-2">
              <BigIntDisplay value={rewardsWeth} decimals={18} />
              <span>WETH</span>
            </h3>
            <Button size="lg" variant="outline" className="space-x-2">
              <Trophy size={16} />
              <span>Claim</span>
            </Button>
          </CardContent>
        </Card>
        <AvailableUniForStaking />
      </div>
    </div>
  )
}
