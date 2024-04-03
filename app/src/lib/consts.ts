import type { Address } from "viem"

export const walletConnectProjectId = "a400484888cee5855802de84aa377695"

export const rewardsToken: Address = "0xdf4b5b2c08a77078c05176d8dfab6274d54215e9"
export const governanceToken: Address = "0x02405b44ae477699cb3d073ef07c106b6885873e"
export const uniStaker: Address = "0xa3ad05099eab69055e4ea4f710361616e51c8c2c"

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
