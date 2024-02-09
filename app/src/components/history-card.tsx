import { AddressDisplay } from "@/components/ui/address-display"
import { Badge } from "@/components/ui/badge"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Card, CardContent } from "@/components/ui/card"
import { never } from "@/lib/assertion"
import type { AccountEventsQuery } from "@/lib/generated/subgraph/graphql"
import type { Dayjs } from "dayjs"
import type dayjs from "dayjs"
import { ReactNode } from "react"
import type { Address } from "viem"

type EventType = Exclude<
  AccountEventsQuery["accountEvents"][number]["event"]["__typename"],
  "RewardNotified" | "SurrogateDeployed" | undefined
>

type SameKeyAndValue<T extends string> = { [K in T]: K }

const EventTypes: SameKeyAndValue<EventType> = {
  BeneficiaryAltered: "BeneficiaryAltered",
  StakeDeposited: "StakeDeposited",
  StakeWithdrawn: "StakeWithdrawn",
  DelegateeAltered: "DelegateeAltered",
  RewardClaimed: "RewardClaimed"
} as const

export type HistoryItem = {
  date: dayjs.Dayjs
  id: string
} & (
  | { type: typeof EventTypes.StakeDeposited; amount: bigint; owner: Address; stakeId: string }
  | { type: typeof EventTypes.StakeWithdrawn; amount: bigint; owner: Address; stakeId: string }
  | {
      type: typeof EventTypes.BeneficiaryAltered
      oldBeneficiary: Address
      newBeneficiary: Address
      owner: Address
      stakeId: string
    }
  | {
      type: typeof EventTypes.DelegateeAltered
      oldDelegatee: Address
      newDelegatee: Address
      owner: Address
      stakeId: string
    }
  | { type: typeof EventTypes.RewardClaimed; beneficiary: Address; amount: bigint }
)

export function HistoryCard(item: HistoryItem) {
  const type = item.type
  switch (type) {
    case EventTypes.StakeDeposited:
      return <StakeCard amount={item.amount} date={item.date} owner={item.owner} stakeId={item.stakeId} />
    case EventTypes.StakeWithdrawn:
      return <UnstakeCard amount={item.amount} date={item.date} owner={item.owner} stakeId={item.stakeId} />
    case EventTypes.BeneficiaryAltered:
      return (
        <ChangeBeneficiaryCard
          date={item.date}
          newBeneficiary={item.newBeneficiary}
          oldBeneficiary={item.oldBeneficiary}
          owner={item.owner}
          stakeId={item.stakeId}
        />
      )
    case EventTypes.DelegateeAltered:
      return (
        <ChangeDelegateeCard
          date={item.date}
          newDelegatee={item.newDelegatee}
          oldDelegatee={item.oldDelegatee}
          owner={item.owner}
          stakeId={item.stakeId}
        />
      )
    case EventTypes.RewardClaimed:
      return <ClaimRewardsCard amount={item.amount} beneficiary={item.beneficiary} date={item.date} />
    default:
      never(type, `Unhandled event type for history card ${type}`)
  }
}

function StakeCard({ amount, date, owner, stakeId }: { date: Dayjs; stakeId: string; owner: Address; amount: bigint }) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Stake">
      <div className="flex flex-row justify-between items-center">
        <span>Amount</span>
        <div>
          <span className="text-lg font-semibold">
            <BigIntDisplay value={amount} decimals={18} precision={2} />
          </span>{" "}
          <span>UNI</span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function UnstakeCard({
  amount,
  date,
  owner,
  stakeId
}: { date: Dayjs; stakeId: string; owner: Address; amount: bigint }) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Unstake">
      <div className="flex flex-row justify-between items-center">
        <span>Amount</span>
        <div>
          <span className="text-lg font-semibold">
            <BigIntDisplay value={amount} decimals={18} precision={2} />
          </span>{" "}
          <span>UNI</span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function ClaimRewardsCard({ amount, beneficiary, date }: { date: Dayjs; amount: bigint; beneficiary: Address }) {
  return (
    <HistoryCardTemplate date={date} beneficiary={beneficiary} title="Claim Rewards">
      <div className="flex flex-row justify-between items-center w-full">
        <span>Amount</span>
        <div>
          <span className="text-lg font-semibold">
            <BigIntDisplay value={amount} decimals={18} precision={4} />
          </span>{" "}
          <span>WETH</span>
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function ChangeDelegateeCard({
  date,
  newDelegatee,
  oldDelegatee,
  owner,
  stakeId
}: {
  date: Dayjs
  stakeId: string
  owner: Address
  oldDelegatee: Address
  newDelegatee: Address
}) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Change Delegatee">
      <div className="space-y-2">
        <div className="flex flex-row justify-between">
          <span>From</span>
          <AddressDisplay value={oldDelegatee} />
        </div>
        <div className="flex flex-row justify-between">
          <span>To</span>
          <AddressDisplay value={newDelegatee} />
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function ChangeBeneficiaryCard({
  date,
  newBeneficiary,
  oldBeneficiary,
  owner,
  stakeId
}: {
  date: Dayjs
  stakeId: string
  owner: Address
  oldBeneficiary: Address
  newBeneficiary: Address
}) {
  return (
    <HistoryCardTemplate date={date} owner={owner} stakeId={stakeId} title="Change Beneficiary">
      <div className="space-y-2">
        <div className="flex flex-row justify-between">
          <span>From</span>
          <AddressDisplay value={oldBeneficiary} />
        </div>
        <div className="flex flex-row justify-between">
          <span>To</span>
          <AddressDisplay value={newBeneficiary} />
        </div>
      </div>
    </HistoryCardTemplate>
  )
}

function HistoryCardTemplate({
  beneficiary,
  children,
  date,
  delegatee,
  owner,
  stakeId,
  title
}: {
  title: string
  date: Dayjs
  children: ReactNode
  stakeId?: string
  owner?: Address
  beneficiary?: Address
  delegatee?: Address
}) {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between p-6">
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="space-x-2">
            {stakeId === undefined ? null : <Badge className="p-2">ID #{stakeId}</Badge>}
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
        <Card className="flex">
          <CardContent className="p-6 min-w-80 min-h-24 flex items-center">
            <div className="w-full">{children}</div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
