import metemaskJazzicon from "@metamask/jazzicon"
import React, { useEffect, useRef } from "react"
import type { Address } from "viem"

export function Jazzicon({ address, size }: { address: Address; size: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const jazziconData = metemaskJazzicon(size, parseInt(address.slice(2, 10), 16))
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(jazziconData)
    }
  }, [address, size])

  return <div className={`h-[${size}px] w-[${size}px]`} ref={containerRef}></div>
}
