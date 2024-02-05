import { useIsClient } from "@/lib/hooks/use-is-client"
import { Children } from "react"

export function NoSsr({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()
  return isClient ? Children.only(children) : null
}
