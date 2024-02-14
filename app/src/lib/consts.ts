import type { Address } from "viem"

export const walletConnectProjectId = "a400484888cee5855802de84aa377695"

// TODO: Development addresses (CREATE2), see `scripts/Deploy.s.sol`.
export const rewardsToken: Address = "0x560c21923a970C27c9456613640E1a0f85e9E958"
export const governanceToken: Address = "0x6F78B36e124C8A7aC3E6D65eB5290Bcb139C5442"
export const uniStaker: Address = "0xE45614BCD1f2CFC7e940DD5b65008C5d205E9A82"

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
