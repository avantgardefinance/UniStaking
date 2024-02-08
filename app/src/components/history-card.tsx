import { AddressDisplay } from "@/components/ui/address-display"
import { Badge } from "@/components/ui/badge"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Card, CardContent } from "@/components/ui/card"
import type { Dayjs } from "dayjs"
import type { Address } from "viem"

export function HistoryCard() {
}

function StakeCard({ amount, date, owner, stakeId }: { date: Dayjs; stakeId: bigint; owner: Address; amount: bigint }) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Stake">
      <div>
        <span>
          Amount
        </span>
        <div>
          <BigIntDisplay value={amount} decimals={18} precision={2} />{" "}
          <span>
            UNI
          </span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function UnstakeCard(
  { amount, date, owner, stakeId }: { date: Dayjs; stakeId: bigint; owner: Address; amount: bigint }
) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Unstake">
      <div>
        <span>
          Amount
        </span>
        <div>
          <BigIntDisplay value={amount} decimals={18} precision={2} />{" "}
          <span>
            UNI
          </span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function ClaimRewardsCard(
  { amount, beneficiary, date }: { date: Dayjs; owner: Address; amount: bigint; beneficiary: Address }
) {
  return (
    <HistoryCardTemplate date={date} beneficiary={beneficiary} title="Claim Rewards">
      <div>
        <span>
          Amount
        </span>
        <div>
          <BigIntDisplay value={amount} decimals={18} precision={4} />{" "}
          <span>
            WETH
          </span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function ChangeDelegateeCard(
  { date, newDelegatee, oldDelegatee, owner, stakeId }: {
    date: Dayjs
    stakeId: bigint
    owner: Address
    oldDelegatee: Address
    newDelegatee: Address
  }
) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Change Delegatee">
      <div>
        <span>
          From
        </span>
        <AddressDisplay value={oldDelegatee} />
      </div>
      <div>
        <span>
          To
        </span>
        <AddressDisplay value={newDelegatee} />
      </div>
    </HistoryCardTemplate>
  )
}

function ChangeBeneficiaryCard(
  { date, newBeneficiary, oldBeneficiary, owner, stakeId }: {
    date: Dayjs
    stakeId: bigint
    owner: Address
    oldBeneficiary: Address
    newBeneficiary: Address
  }
) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Change Beneficiary">
      <div>
        <span>
          From
        </span>
        <AddressDisplay value={oldBeneficiary} />
      </div>
      <div>
        <span>
          To
        </span>
        <AddressDisplay value={newBeneficiary} />
      </div>
    </HistoryCardTemplate>
  )
}

function HistoryCardTemplate(
  { beneficiary, children, date, delegatee, owner, stakeId, title }: {
    title: string
    date: Dayjs
    children: React.ReactNode
    stakeId?: bigint
    owner?: Address
    beneficiary?: Address
    delegatee?: Address
  }
) {
  return (
    <Card>
      <CardContent className="">
        <div>
          <h3>{title}</h3>
          <div>
            {stakeId === undefined ? null : <Badge className="p-2">ID #{stakeId.toString()}</Badge>}
            {owner === undefined ? null : (
              <Badge className="p-2">
                <div className="flex items-center space-x-2">
                  <span>Owner</span> <AddressDisplay iconSize={12} value={owner} />
                </div>
              </Badge>
            )}
            {beneficiary === undefined ? null : (
              <Badge className="p-2">
                <div className="flex items-center space-x-2">
                  <span>Beneficiary</span> <AddressDisplay iconSize={12} value={beneficiary} />
                </div>
              </Badge>
            )}
            {delegatee === undefined ? null : (
              <Badge className="p-2">
                <div className="flex items-center space-x-2">
                  <span>Delegatee</span> <AddressDisplay iconSize={12} value={delegatee} />
                </div>
              </Badge>
            )}
            <Badge className="p-2" variant="secondary">
              Date {date.format("YYYY-MM-DD HH:mm")}
            </Badge>
          </div>
        </div>
        <Card>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
