import { EditBeneficiaryDelegateeDialogContent } from "@/components/edit-beneficiary-delegatee-dialog"
import { StakeMoreDialogContent } from "@/components/stake-more-dialog"
import { AddressDisplay } from "@/components/ui/address-display"
import { Badge } from "@/components/ui/badge"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UnstakeDialogContent } from "@/components/unstake-dialog"
import type * as dayjs from "dayjs"
import { Download, Info, Upload } from "lucide-react"
import { type Address, isAddressEqual } from "viem"
import { useAccount } from "wagmi"

function useStakeDepositCard({ owner }: { owner: Address }) {
  const account = useAccount()
  return {
    isOwner: account.address ? isAddressEqual(account.address, owner) : false
  }
}

export type StakeDeposit = {
  stakeId: bigint
  stakedAmount: bigint
  createdAt: dayjs.Dayjs
  updatedAt: dayjs.Dayjs
  owner: Address
  beneficiary: Address
  delegatee: Address
}
export type StakeDepositCardProps = {
  deposit: StakeDeposit
  governanceTokenBalanceValue: bigint
}

export function StakeDepositCard({
  deposit: { beneficiary, createdAt, delegatee, owner, stakeId, stakedAmount, updatedAt },
  governanceTokenBalanceValue
}: StakeDepositCardProps) {
  const { isOwner } = useStakeDepositCard({ owner })
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="space-x-2">
          <Badge className="p-2">ID #{stakeId.toString()}</Badge>
          <Badge className="p-2">
            <div className="flex items-center space-x-2">
              <span>Owner</span> <AddressDisplay iconSize={12} value={owner} />
            </div>
          </Badge>
          <Badge className="p-2" variant="secondary">
            Created {createdAt.format("YYYY-MM-DD HH:mm")}
          </Badge>
          <Badge className="p-2" variant="secondary">
            Last update {updatedAt.format("YYYY-MM-DD HH:mm")}
          </Badge>
        </div>
        <div className="text-2xl font-semibold">
          <BigIntDisplay value={stakedAmount} decimals={18} precision={2} /> <span>UNI</span>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-end space-x-4">
          <div>
            <span>Delegatee</span>
            <AddressDisplay value={delegatee} />
          </div>
          <div>
            <span>Beneficiary</span>
            <AddressDisplay value={beneficiary} />
          </div>
          {isOwner && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">Edit</Button>
              </DialogTrigger>
              <EditBeneficiaryDelegateeDialogContent
                stakeId={stakeId}
                delegatee={delegatee}
                beneficiary={beneficiary}
              />
            </Dialog>
          )}
        </div>
        <div className="flex flex-row items-center space-x-4">
          {isOwner ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="space-x-2">
                    <Upload size={16} />
                    <span>Unstake</span>
                  </Button>
                </DialogTrigger>
                <UnstakeDialogContent
                  availableForUnstaking={stakedAmount}
                  stakeId={stakeId}
                  delegatee={delegatee}
                  beneficiary={beneficiary}
                />
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" disabled={governanceTokenBalanceValue === 0n} className="space-x-2">
                    <Download size={16} /> <span>Stake</span>
                  </Button>
                </DialogTrigger>
                <StakeMoreDialogContent
                  availableForStakingUni={governanceTokenBalanceValue}
                  stakeId={stakeId}
                  delegatee={delegatee}
                  beneficiary={beneficiary}
                />
              </Dialog>
            </>
          ) : (
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
