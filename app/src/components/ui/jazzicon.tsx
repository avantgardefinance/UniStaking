import metemaskJazzicon from "@metamask/jazzicon"
import React from "react"
import type { Address } from "viem"

export function Jazzicon({ address, size }: { address: Address; size: number }) {
  const jazziconData = metemaskJazzicon(size, parseInt(address.slice(2, 10), 16))

  return (
    <div
      className={`h-[${size}px] w-[${size}px]`}
      dangerouslySetInnerHTML={{ __html: new XMLSerializer().serializeToString(jazziconData) }}
    />
  )
}
