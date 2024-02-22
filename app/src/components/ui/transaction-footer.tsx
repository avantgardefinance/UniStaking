import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ReactNode } from "react"

export function TransactionFooter({
  progress,
  isSubmitButtonEnabled
}: {
  progress: {
    value: number
    progressDescription: ReactNode
    buttonContent: ReactNode
  }
  isSubmitButtonEnabled: boolean
}) {
  return (
    <>
      {progress.value === 0 ? null : (
        <div className="space-y-1">
          {progress.progressDescription}
          <Progress value={progress.value} />
        </div>
      )}
      <DialogFooter>
        <Button type="submit" className="space-x-2" disabled={!isSubmitButtonEnabled}>
          {progress.buttonContent}
        </Button>
      </DialogFooter>
    </>
  )
}
