"use client"

import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { abi as abiUniStaker } from "@/lib/abi/uni-staker"
import { uniStaker } from "@/lib/consts"
import { useWriteContractWithToast } from "@/lib/hooks/use-write-contract-with-toast"
import { Trophy } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useAccount, useReadContract } from "wagmi"

function useStakeCardRewards() {
  const account = useAccount()

  const { data: rewards, refetch, status } = useReadContract({
    address: uniStaker,
    abi: abiUniStaker,
    functionName: "earned",
    args: account.address === undefined ? undefined : [account.address]
  })

  const {
    isSuccess,
    writeContract
  } = useWriteContractWithToast()

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch])

  const writeClaim = useCallback(() => {
    writeContract({
      address: uniStaker,
      abi: abiUniStaker,
      functionName: "claimReward"
    })
  }, [writeContract])

  const isAbleToClaim = rewards !== 0n && rewards !== undefined

  return { rewards, status, writeClaim, isAbleToClaim }
}

export function StakeCardRewards() {
  const { isAbleToClaim, rewards, status, writeClaim } = useStakeCardRewards()

  if (status === "error") {
    return "Error"
  }

  if (status === "pending") {
    return "Loading"
  }

  if (rewards === undefined) {
    return "Not available"
  }

  return (
    <Card className="grow">
      <CardHeader>
        <CardDescription className="text-base font-medium">Rewards</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-x-2 text-2xl font-semibold">
        <h3 className="space-x-2">
          <BigIntDisplay value={rewards} decimals={18} />
          <span>WETH</span>
        </h3>
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
