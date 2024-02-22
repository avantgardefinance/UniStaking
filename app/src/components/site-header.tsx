import { ConnectButton } from "@/components/connect-button"
import { Logo } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, History } from "lucide-react"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-background w-full">
      <div className="flex items-center space-x-4 sm:justify-between sm:space-x-0 flex-wrap">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-xl">Uniswap Protocol Staking</h1>
        </Link>
        <nav className="flex flex-1 items-center gap-2 flex-wrap justify-end">
          <ConnectButton />
          <div className="flex gap-2">
            <Link href="/">
              <div
                className={cn(
                  "space-x-2",
                  buttonVariants({
                    variant: "outline"
                  })
                )}
              >
                <Download size={16} />
                <span>Stake</span>
              </div>
            </Link>
            <Link href="/history">
              <div
                className={cn(
                  "space-x-2",
                  buttonVariants({
                    variant: "outline"
                  })
                )}
              >
                <History size={16} />
                <span>History</span>
              </div>
            </Link>

            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
