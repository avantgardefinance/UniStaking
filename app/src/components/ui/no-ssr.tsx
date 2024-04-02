import { useIsClient } from "@/lib/hooks/use-is-client"
import { Children, type ReactNode } from "react"

export function NoSsr({ children }: { children: ReactNode }) {
  const isClient = useIsClient()
  return isClient ? Children.only(children) : null
}
