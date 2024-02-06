import metemaskJazzicon from "@metamask/jazzicon"
import type { Address } from "viem"

export function Jazzicon({ address, size }: { address: Address; size: number }) {
  const Icon = metemaskJazzicon(size, Number(address))
  return <Icon />
}
