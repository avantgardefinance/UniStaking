"use client"

import { StakeDialogContent } from "@/components/stake-dialog"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { governanceToken } from "@/lib/consts"
import { Download } from "lucide-react"
import { useAccount, useBalance } from "wagmi"

function useAvailableUniForStaking() {
  const account = useAccount()

  const { data, isLoading } = useBalance({
    address: account.address,
    token: governanceToken
  })
  return { data, isLoading }
}

export function AvailableUniForStaking() {
  const { data, isLoading } = useAvailableUniForStaking()

  return (
    <>
      <Card className="grow">
        <CardHeader>
          <CardDescription className="text-base font-medium">Available for staking</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between space-x-2 text-2xl font-semibold">
          {isLoading ? "Loading... " : (
            <h3 className="space-x-2">
              {data === undefined ? <span>N/A</span> : <BigIntDisplay value={data.value} decimals={data.decimals} />}
              <span>UNI</span>
            </h3>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={data === undefined} size="lg" className=" space-x-2">
                <Download size={16} />
                <span>Stake</span>
              </Button>
            </DialogTrigger>
            {data === undefined ? null : <StakeDialogContent availableForStakingUni={data.value} />}
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
