export const abi = [
  {
    inputs: [
      { internalType: "contract IERC20", name: "_rewardToken", type: "address" },
      { internalType: "contract IERC20Delegates", name: "_stakeToken", type: "address" },
      { internalType: "address", name: "_admin", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [{ internalType: "address", name: "target", type: "address" }], name: "AddressEmptyCode", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "currentNonce", type: "uint256" }
    ],
    name: "InvalidAccountNonce",
    type: "error"
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  { inputs: [{ internalType: "string", name: "str", type: "string" }], name: "StringTooLong", type: "error" },
  { inputs: [], name: "UniStaker__ExpiredDeadline", type: "error" },
  { inputs: [], name: "UniStaker__InsufficientRewardBalance", type: "error" },
  { inputs: [], name: "UniStaker__InvalidAddress", type: "error" },
  { inputs: [], name: "UniStaker__InvalidRewardRate", type: "error" },
  { inputs: [], name: "UniStaker__InvalidSignature", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "reason", type: "bytes32" },
      { internalType: "address", name: "caller", type: "address" }
    ],
    name: "UniStaker__Unauthorized",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "oldAdmin", type: "address" },
      { indexed: true, internalType: "address", name: "newAdmin", type: "address" }
    ],
    name: "AdminSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "UniStaker.DepositIdentifier", name: "depositId", type: "uint256" },
      { indexed: true, internalType: "address", name: "oldBeneficiary", type: "address" },
      { indexed: true, internalType: "address", name: "newBeneficiary", type: "address" }
    ],
    name: "BeneficiaryAltered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "UniStaker.DepositIdentifier", name: "depositId", type: "uint256" },
      { indexed: false, internalType: "address", name: "oldDelegatee", type: "address" },
      { indexed: false, internalType: "address", name: "newDelegatee", type: "address" }
    ],
    name: "DelegateeAltered",
    type: "event"
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "beneficiary", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "RewardClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "address", name: "notifier", type: "address" }
    ],
    name: "RewardNotified",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "bool", name: "isEnabled", type: "bool" }
    ],
    name: "RewardNotifierSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "UniStaker.DepositIdentifier", name: "depositId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "depositBalance", type: "uint256" }
    ],
    name: "StakeDeposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "UniStaker.DepositIdentifier", name: "depositId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "depositBalance", type: "uint256" }
    ],
    name: "StakeWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "delegatee", type: "address" },
      { indexed: true, internalType: "address", name: "surrogate", type: "address" }
    ],
    name: "SurrogateDeployed",
    type: "event"
  },
  {
    inputs: [],
    name: "ALTER_BENEFICIARY_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ALTER_DELEGATEE_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "CLAIM_REWARD_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "REWARD_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "REWARD_TOKEN",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SCALE_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "STAKE_MORE_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "STAKE_TOKEN",
    outputs: [{ internalType: "contract IERC20Delegates", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "STAKE_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WITHDRAW_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "address", name: "_newBeneficiary", type: "address" }
    ],
    name: "alterBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "address", name: "_newBeneficiary", type: "address" },
      { internalType: "address", name: "_depositor", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "alterBeneficiaryOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "address", name: "_newDelegatee", type: "address" }
    ],
    name: "alterDelegatee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "address", name: "_newDelegatee", type: "address" },
      { internalType: "address", name: "_depositor", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "alterDelegateeOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "beneficiaryRewardPerTokenCheckpoint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "claimReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "claimRewardOnBehalf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "depositor", type: "address" }],
    name: "depositorTotalStaked",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "UniStaker.DepositIdentifier", name: "depositId", type: "uint256" }],
    name: "deposits",
    outputs: [
      { internalType: "uint96", name: "balance", type: "uint96" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "delegatee", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "beneficiary", type: "address" }],
    name: "earningPower",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "invalidateNonce", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "rewardNotifier", type: "address" }],
    name: "isRewardNotifier",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastCheckpointTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastTimeRewardDistributed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "notifyRewardAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_delegatee", type: "address" },
      { internalType: "address", name: "_beneficiary", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "uint8", name: "_v", type: "uint8" },
      { internalType: "bytes32", name: "_r", type: "bytes32" },
      { internalType: "bytes32", name: "_s", type: "bytes32" }
    ],
    name: "permitAndStake",
    outputs: [{ internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "uint8", name: "_v", type: "uint8" },
      { internalType: "bytes32", name: "_r", type: "bytes32" },
      { internalType: "bytes32", name: "_s", type: "bytes32" }
    ],
    name: "permitAndStakeMore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardEndTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardPerTokenAccumulated",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardPerTokenAccumulatedCheckpoint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "scaledRewardRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "scaledUnclaimedRewardCheckpoint",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newAdmin", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_rewardNotifier", type: "address" },
      { internalType: "bool", name: "_isEnabled", type: "bool" }
    ],
    name: "setRewardNotifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_delegatee", type: "address" },
      { internalType: "address", name: "_beneficiary", type: "address" }
    ],
    name: "stake",
    outputs: [{ internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_delegatee", type: "address" }
    ],
    name: "stake",
    outputs: [{ internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "uint96", name: "_amount", type: "uint96" }
    ],
    name: "stakeMore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_depositor", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "stakeMoreOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_delegatee", type: "address" },
      { internalType: "address", name: "_beneficiary", type: "address" },
      { internalType: "address", name: "_depositor", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "stakeOnBehalf",
    outputs: [{ internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
    name: "surrogates",
    outputs: [{ internalType: "contract DelegationSurrogate", name: "surrogate", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_beneficiary", type: "address" }],
    name: "unclaimedReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "uint96", name: "_amount", type: "uint96" }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "UniStaker.DepositIdentifier", name: "_depositId", type: "uint256" },
      { internalType: "uint96", name: "_amount", type: "uint96" },
      { internalType: "address", name: "_depositor", type: "address" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "withdrawOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const
