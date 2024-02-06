import { Jazzicon } from "@/components/ui/jazzicon"
import type { Address } from "viem"

export function AddressDisplay({ iconSize = 16, value }: { value: Address; iconSize?: number }) {
  return (
    <div className="space-x-2">
      {/* TODO: add copy on click */}
      <Jazzicon size={iconSize} address={value} />
      <span>
        {value.slice(0, 6)}...{value.slice(-4)}
      </span>
    </div>
  )
}
