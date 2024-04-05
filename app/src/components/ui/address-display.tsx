import { Jazzicon } from "@/components/ui/jazzicon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Address } from "viem"

export function AddressDisplay({ iconSize = 16, value }: { value: Address; iconSize?: number }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex flex-row items-center space-x-2 cursor-default">
          <Jazzicon size={iconSize} address={value} />
          <span>
            {value.slice(0, 6)}...{value.slice(-4)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
