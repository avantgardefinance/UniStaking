import type { Address } from "viem"

export const walletConnectProjectId = "a400484888cee5855802de84aa377695"

export const rewardsToken: Address = "0x0fFac752CD6Da16896c6163b3Aba4C8CF483D624"
export const governanceToken: Address = "0xC796953C443f542728EEdf33AAb32753d3f7A91a"
export const uniStaker: Address = "0x8019fc84c804a9de8f0bcffb5cf90d9982d3f8c5"

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
