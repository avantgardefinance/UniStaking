import { invariant } from "@/lib/assertion"
import { wait } from "@/lib/time"

export async function closeDialog({ context }: { context: { closeDialog?: () => void } }) {
  invariant(context.closeDialog !== undefined, "Close dialog is not undefined")
  await wait(3_000) // give some time for user to see the transaction success message
  context.closeDialog()
}
