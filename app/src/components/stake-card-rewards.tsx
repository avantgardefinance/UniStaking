"use client"

import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { NoSsr } from "@/components/ui/no-ssr"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useContractWriteWithToast } from "@/lib/hooks/useContractWriteWithToast"
import { Trophy } from "lucide-react"
import { useCallback } from "react"
import { useAccount, useReadContract } from "wagmi"

function useStakeCardRewards() {
  const account = useAccount()

  const { data: rewards, isLoading: isLoadingRewards } = useReadContract({
    address: uniStaker,
    abi: abiUniStaker,
    functionName: "earned",
    args: account.address === undefined ? undefined : [account.address]
  })

  const {
    writeContract
  } = useContractWriteWithToast({
    address: uniStaker,
    abi: abiUniStaker,
    functionName: "claimReward"
  })

  const writeClaim = useCallback(() => {
    writeContract({
      address: uniStaker,
      abi: abiUniStaker,
      functionName: "claimReward"
    })
  }, [writeContract])

  const isAbleToClaim = rewards !== 0n && rewards !== undefined

  return { rewards, isLoadingRewards, writeClaim, isAbleToClaim }
}

export function StakeCardRewards() {
  const { isAbleToClaim, isLoadingRewards, rewards, writeClaim } = useStakeCardRewards()

  return (
    <Card className="grow">
      <CardHeader>
        <CardDescription className="text-base font-medium">Rewards</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-x-2 text-2xl font-semibold">
        {isLoadingRewards ? "Loading... " : (
          <h3 className="space-x-2">
            {rewards === undefined ? <span>N/A</span> : <BigIntDisplay value={rewards} decimals={18} />}
            <span>WETH</span>
          </h3>
        )}
        <Button
          size="lg"
          disabled={!isAbleToClaim}
          variant="outline"
          onClick={() => writeClaim()}
          className="space-x-2"
        >
          <Trophy size={16} />
          <span>Claim</span>
        </Button>
      </CardContent>
    </Card>
  )
}
