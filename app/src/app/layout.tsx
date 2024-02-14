import "@/styles/globals.css"

import { Providers } from "@/components/providers/providers"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" media="(prefers-color-scheme: light)" color="white" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" color="black" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <div className="mx-5 md:mx-20 lg:mx-40">
          <div className="relative flex min-h-screen flex-col pt-2">
            <Providers>
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </Providers>
          </div>
        </div>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
