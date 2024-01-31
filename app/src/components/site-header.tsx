import { ConnectButton } from "@/components/connect-button"
import { Logo } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, History } from "lucide-react"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="size-6" />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ConnectButton />
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
          </nav>
        </div>
      </div>
    </header>
  )
}
