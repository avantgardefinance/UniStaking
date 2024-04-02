import metemaskJazzicon from "@metamask/jazzicon"
import { useMemo } from "react"
import type { Address } from "viem"

export function Jazzicon({ address, size }: { address: Address; size: number }) {
  const jazziconData = useMemo(() => metemaskJazzicon(size, Number.parseInt(address.slice(2, 10), 16)), [address, size])

  return (
    <div
      className={`h-[${size}px] w-[${size}px]`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: jazziconData.outerHTML }}
    />
  )
}
