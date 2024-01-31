import { formatUnits } from "viem"

export function BigIntDisplay({ decimals, value }: { value: bigint; decimals: number }) {
  return (
    <span>
      {formatUnits(value, decimals)}
    </span>
  )
}
