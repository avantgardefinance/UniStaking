import type { Address } from "viem"

export const walletConnectProjectId = "a400484888cee5855802de84aa377695"

export const rewardsToken: Address = "0x2b9c54c1aa3d4365369db7412202f06ad47f1df1"
export const governanceToken: Address = "0xec4f972a3585b4c72f095d3fd2e6385afa41bae8"
export const uniStaker: Address = "0x111616271964951ee149aF3F47f7B3dd2f26ce26"

// Const related to signing in permit flow
export const timeToMakeTransaction = 10 * 60 * 60 // 10 minutes
const primaryType = "Permit"
const permitTypes = {
  [primaryType]: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
} as const
const domainBase = {
  name: "Uniswap",
  verifyingContract: governanceToken
} as const
export const permitEIP712Options = {
  permitTypes,
  domainBase,
  primaryType
} as const
