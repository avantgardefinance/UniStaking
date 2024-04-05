import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

interface Props {
  currentlyStaked?: bigint
  isLoading: boolean
  error?: Error
}

export function StakeCardTotalStaked(props: Props) {
  return (
    <Card className="flex-1 flex justify-between flex-col">
      <CardHeader>
        <CardDescription className="text-base font-medium">Total Staked</CardDescription>
      </CardHeader>
      <CardContent>
        <StakeCardTotalStakedContent {...props} />
      </CardContent>
    </Card>
  )
}

function StakeCardTotalStakedContent({ currentlyStaked, isLoading, error }: Props) {
  if (isLoading) {
    return "Loading..."
  }

  if (error) {
    return "Error"
  }

  if (currentlyStaked === undefined) {
    return "Not available"
  }

  return (
    <>
      <h3 className="space-x-2 flex-grow">
        <span className="text-2xl font-semibold">
          <BigIntDisplay value={currentlyStaked} decimals={18} />
        </span>
        <span className="text-xl">UNI</span>
      </h3>
    </>
  )
}
