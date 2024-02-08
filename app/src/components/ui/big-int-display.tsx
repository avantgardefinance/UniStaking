import { formatUnits } from "viem"

export function BigIntDisplay({ decimals, precision, value }: { value: bigint; decimals: number; precision: number }) {
  return (
    <span>
      {Number(formatUnits(value, decimals)).toLocaleString(undefined, { maximumFractionDigits: precision })}
    </span>
  )
}
