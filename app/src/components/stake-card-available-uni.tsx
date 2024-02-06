"use client"

import { StakeDialogContent } from "@/components/stake-dialog"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { NoSsr } from "@/components/ui/no-ssr"
import { useGovernanceTokenBalance } from "@/lib/hooks/use-governance-token-balance"
import { Download } from "lucide-react"

export function AvailableUniForStaking() {
  return (
    <Card className="grow">
      <CardHeader>
        <CardDescription className="text-base font-medium">
          Available for staking
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-x-2 text-2xl font-semibold">
        <NoSsr>
          <AvailableUniForStakingContent />
        </NoSsr>
      </CardContent>
    </Card>
  )
}

function AvailableUniForStakingContent() {
  const { data, status } = useGovernanceTokenBalance()

  if (status === "error") {
    return "Error"
  }

  if (status === "pending") {
    return "Loading..."
  }

  if (data === undefined) {
    return "Not available"
  }

  return (
    <>
      <h3 className="space-x-2">
        <span>
          <BigIntDisplay value={data.value} decimals={data.decimals} precision={2} />
        </span>
        <span>{data.symbol}</span>
      </h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="space-x-2">
            <Download size={16} />
            <span>Stake</span>
          </Button>
        </DialogTrigger>
        <StakeDialogContent availableForStakingUni={data.value} />
      </Dialog>
    </>
  )
}
