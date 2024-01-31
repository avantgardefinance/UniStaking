export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_rewardsToken",
        "type": "address",
        "internalType": "contract IERC20"
      },
      {
        "name": "_stakeToken",
        "type": "address",
        "internalType": "contract IERC20Delegates"
      },
      {
        "name": "_rewardsNotifier",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "REWARDS_NOTIFIER",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "REWARDS_TOKEN",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "contract IERC20" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "REWARD_DURATION",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "STAKE_TOKEN",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20Delegates"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "alterBeneficiary",
    "inputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      },
      {
        "name": "_newBeneficiary",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "alterDelegatee",
    "inputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      },
      { "name": "_newDelegatee", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimReward",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deposits",
    "inputs": [
      {
        "name": "depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      }
    ],
    "outputs": [
      { "name": "balance", "type": "uint256", "internalType": "uint256" },
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "delegatee", "type": "address", "internalType": "address" },
      { "name": "beneficiary", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "earned",
    "inputs": [
      { "name": "_beneficiary", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "earningPower",
    "inputs": [
      { "name": "beneficiary", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "finishAt",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lastTimeRewardApplicable",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "notifyRewardsAmount",
    "inputs": [
      { "name": "_amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rewardPerToken",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewardPerTokenStored",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewardRate",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewards",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stake",
    "inputs": [
      { "name": "_amount", "type": "uint256", "internalType": "uint256" },
      { "name": "_delegatee", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stake",
    "inputs": [
      { "name": "_amount", "type": "uint256", "internalType": "uint256" },
      { "name": "_delegatee", "type": "address", "internalType": "address" },
      { "name": "_beneficiary", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stakeMore",
    "inputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      },
      { "name": "_amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "surrogates",
    "inputs": [
      { "name": "delegatee", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      {
        "name": "surrogate",
        "type": "address",
        "internalType": "contract DelegationSurrogate"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalDeposits",
    "inputs": [
      { "name": "depositor", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updatedAt",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userRewardPerTokenPaid",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "_depositId",
        "type": "uint256",
        "internalType": "UniStaker.DepositIdentifier"
      },
      { "name": "_amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "error",
    "name": "AddressEmptyCode",
    "inputs": [
      { "name": "target", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "AddressInsufficientBalance",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ]
  },
  { "type": "error", "name": "FailedInnerCall", "inputs": [] },
  { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
  {
    "type": "error",
    "name": "SafeERC20FailedOperation",
    "inputs": [
      { "name": "token", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "UniStaker__InsufficientRewardBalance",
    "inputs": []
  },
  { "type": "error", "name": "UniStaker__InvalidAddress", "inputs": [] },
  { "type": "error", "name": "UniStaker__InvalidRewardRate", "inputs": [] },
  {
    "type": "error",
    "name": "UniStaker__Unauthorized",
    "inputs": [
      { "name": "reason", "type": "bytes32", "internalType": "bytes32" },
      { "name": "caller", "type": "address", "internalType": "address" }
    ]
  }
] as const
