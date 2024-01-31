import "@/styles/globals.css"
import { Providers } from "@/components/providers/providers"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

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
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            color="white"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            color="black"
          />
        </head>
        <body
          className={cn(
            "mx-5 min-h-screen  font-sans antialiased md:mx-20 lg:mx-40",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  )
}
