import { StakeDialogContent } from "@/components/stake-dialog"
import { BigIntDisplay } from "@/components/ui/big-int-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface Props {
  availableForStakingUni?: bigint
  isLoading: boolean
  error?: Error
}

export function AvailableUniForStaking(props: Props) {
  return (
    <Card className="flex-1 flex justify-between flex-col">
      <CardHeader>
        <CardDescription className="text-base font-medium">Available for staking</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between flex-wrap gap-2">
        <AvailableUniForStakingContent {...props} />
      </CardContent>
    </Card>
  )
}

function AvailableUniForStakingContent({ availableForStakingUni, isLoading, error }: Props) {
  if (isLoading) {
    return "Loading..."
  }

  if (error) {
    return "Error"
  }

  if (availableForStakingUni === undefined) {
    return "Not available"
  }

  return (
    <>
      <h3 className="space-x-2 flex-grow">
        <span className="text-2xl font-semibold">
          <BigIntDisplay value={availableForStakingUni} decimals={18} precision={2} />
        </span>
        <span className="text-xl">UNI</span>
      </h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="space-x-2 flex-grow">
            <Plus size={16} />
            <span>Create position</span>
          </Button>
        </DialogTrigger>
        <StakeDialogContent availableForStakingUni={availableForStakingUni} />
      </Dialog>
    </>
  )
}
