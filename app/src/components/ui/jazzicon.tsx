import jazzicon from "@metamask/jazzicon"
import type { Address } from "viem"

export function Jazzicon({ address, size }: { address: Address; size: number }) {
  const Icon = jazzicon(size, 1000)

  return <Icon />
}
