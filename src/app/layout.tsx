import "@/styles/globals.css";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Providers } from "@/components/providers/providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
            "min-h-screen font-sans antialiased",
            fontSans.variable,
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
  );
}
