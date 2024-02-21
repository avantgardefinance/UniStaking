import { Deposit } from "@/app/api/deposits/model"
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
import { formatDate } from "@/lib/date"
import { Download, Info, Upload } from "lucide-react"
import { useState } from "react"
import { type Address, isAddressEqual } from "viem"

export type StakeDepositCardProps = {
  deposit: Deposit
  governanceTokenBalanceValue: bigint
  account: Address
}

function useStakeDepositCard({ account, owner }: { account: Address; owner: Address }) {
  const isOwner = isAddressEqual(account, owner)
  const [stakeMoreOpened, setStakeMoreOpened] = useState(false)

  return {
    isOwner,
    stakeMoreOpened,
    setStakeMoreOpened
  }
}

export function StakeDepositCard({
  deposit: { beneficiary, createdAt, delegatee, owner, stakeId, stakedAmount, updatedAt },
  governanceTokenBalanceValue,
  account
}: StakeDepositCardProps) {
  const { isOwner, stakeMoreOpened, setStakeMoreOpened } = useStakeDepositCard({ account, owner })

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Badge className="md:p-2">ID #{stakeId}</Badge>
          <Badge className="md:p-2">
            <div className="flex items-center space-x-2">
              <span>Owner</span> <AddressDisplay iconSize={12} value={owner} />
            </div>
          </Badge>
          <Badge className="md:p-2" variant="secondary">
            Created {formatDate(createdAt)}
          </Badge>
          <Badge className="md:p-2" variant="secondary">
            Last update {formatDate(updatedAt)}
          </Badge>
        </div>
        <div className="space-x-2 flex items-baseline">
          <span className="text-2xl font-semibold">
            <BigIntDisplay value={stakedAmount} decimals={18} precision={2} />
          </span>
          <span className="text-xl">UNI</span>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="flex flex-row items-center justify-between flex-wrap gap-2">
        <div className="flex flex-row items-end space-x-4 flex-wrap">
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
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {isOwner ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="space-x-2 w-full md:w-auto">
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
              <Dialog onOpenChange={setStakeMoreOpened}>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    disabled={governanceTokenBalanceValue === 0n}
                    className="space-x-2 w-full md:w-auto"
                  >
                    <Download size={16} /> <span>Stake</span>
                  </Button>
                </DialogTrigger>
                <StakeMoreDialogContent
                  key={`stakeMore${stakeMoreOpened}`}
                  account={account}
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
