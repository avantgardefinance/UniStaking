import { useIsClient } from "@/lib/hooks/use-is-client"
import { Children, ReactNode } from "react"

export function NoSsr({ children }: { children: ReactNode }) {
  const isClient = useIsClient()
  return isClient ? Children.only(children) : null
}
