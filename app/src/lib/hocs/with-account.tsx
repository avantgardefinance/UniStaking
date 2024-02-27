import { ConnectButton } from "@/components/connect-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as React from "react"
import { Address } from "viem"
import { useAccount } from "wagmi"

export function withAccount<Props extends object>(WrappedComponent: React.ComponentType<Props & { account: Address }>) {
  return (props: Props) => {
    const account = useAccount()

    if (account.address === undefined) {
      return (
        <Card className="flex items-center flex-col">
          <CardHeader>
            <CardTitle>Connect your wallet to stake UNI</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectButton />
          </CardContent>
        </Card>
      )
    }

    return <WrappedComponent {...props} account={account.address} />
  }
}
