import { AddressDisplay } from "@/components/ui/address-display"
import { Badge } from "@/components/ui/badge"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UnstakeDialogContent } from "@/components/unstake-dialog"
import type * as dayjs from "dayjs"
import { Download, Info, Upload } from "lucide-react"
import { type Address, isAddressEqual } from "viem"
import { useAccount } from "wagmi"

function useStakePositionCard({ owner }: { owner: Address }) {
  const account = useAccount()
  return { isOwner: account.address ? isAddressEqual(account.address, owner) : false }
}

export type StakePositionCardProps = {
  stakeId: bigint
  stakedAmount: bigint
  createdAt: dayjs.Dayjs
  updatedAt: dayjs.Dayjs
  owner: Address
  beneficiary: Address
  delegatee: Address
}

export function StakePositionCard(
  { beneficiary, createdAt, delegatee, owner, stakeId, stakedAmount, updatedAt }: StakePositionCardProps
) {
  const { isOwner } = useStakePositionCard({ owner })
  return (
    <Card>
      <CardHeader>
        <div className="space-x-2">
          <Badge className="p-2">
            ID #{stakeId.toString()}
          </Badge>
          <Badge className="p-2">
            <div className="flex items-center space-x-2">
              <span>Owner</span> <AddressDisplay value={owner} />
            </div>
          </Badge>
          <Badge className="p-2" variant="secondary">
            Created {createdAt.format("YYYY-MM-DD HH:mm")}
          </Badge>
          <Badge className="p-2" variant="secondary">
            Last update {updatedAt.format("YYYY-MM-DD HH:mm")}
          </Badge>
        </div>
        <div>
          <BigIntDisplay value={stakedAmount} decimals={18} precision={2} />
          <span>UNI</span>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <span>Delegatee</span>
            <AddressDisplay value={delegatee} />
          </div>
          <div>
            <span>Beneficiary</span>
            <AddressDisplay value={beneficiary} />
          </div>
          {isOwner && <Button variant="ghost">Edit</Button>}
        </div>
        <div className="space-x-2">
          {isOwner ?
            (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="space-x-2">
                      <Upload size={16} />Unstake
                    </Button>
                  </DialogTrigger>
                  <UnstakeDialogContent
                    availableForUnstaking={stakedAmount}
                    stakeId={stakeId}
                    delegatee={delegatee}
                    beneficiary={beneficiary}
                  />
                </Dialog>

                <Button variant="secondary" className="space-x-2">
                  <Download size={16} />Stake
                </Button>
              </>
            ) :
            (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You are not an owner of this stake</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
