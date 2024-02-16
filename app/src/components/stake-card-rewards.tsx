"use client"

import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Trophy } from "lucide-react"
import { Address } from "viem"
import { useReadContract } from "wagmi"

function useStakeCardRewards(account: Address) {
  const { data: rewards, status } = useReadContract({
    address: uniStaker,
    abi: abiUniStaker,
    functionName: "unclaimedReward",
    args: [account]
  })

  const queryClient = useQueryClient()
  const { writeContract } = useWriteContractWithToast({
    mutation: {
      onSettled: () => queryClient.invalidateQueries()
    }
  })

  const writeClaim = () =>
    writeContract({
      address: uniStaker,
      abi: abiUniStaker,
      functionName: "claimReward"
    })

  const isAbleToClaim = rewards !== 0n && rewards !== undefined

  return { rewards, writeClaim, isAbleToClaim, status }
}

export function StakeCardRewards({ account }: { account: Address }) {
  return (
    <Card className="flex-1 flex justify-between flex-col">
      <CardHeader>
        <CardDescription className="text-base font-medium">Rewards</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between flex-wrap gap-2">
        <StakeCardRewardsContent account={account} />
      </CardContent>
    </Card>
  )
}

function StakeCardRewardsContent({ account }: { account: Address }) {
  const { isAbleToClaim, rewards, status, writeClaim } = useStakeCardRewards(account)

  if (status === "error") {
    return "Error"
  }

  if (status === "pending") {
    return "Loading..."
  }

  if (rewards === undefined) {
    return "Not available"
  }

  return (
    <>
      <h3 className="space-x-2 flex-grow">
        <span className="font-semibold text-2xl">
          <BigIntDisplay value={rewards} decimals={18} precision={4} />
        </span>
        <span className="text-xl">WETH</span>
      </h3>

      <Button
        size="lg"
        disabled={!isAbleToClaim}
        variant="outline"
        onClick={() => writeClaim()}
        className="space-x-2 flex-grow"
      >
        <Trophy size={16} />
        <span>Claim</span>
      </Button>
    </>
  )
}
