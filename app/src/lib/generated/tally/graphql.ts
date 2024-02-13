/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** AccountID is a CAIP-10 compliant account id. */
  AccountID: { input: any; output: any; }
  /** Address is a 20 byte Ethereum address, represented as 0x-prefixed hexadecimal. */
  Address: { input: any; output: any; }
  /** AssetID is a CAIP-19 compliant asset id. */
  AssetID: { input: any; output: any; }
  /** BlockID is a ChainID scoped identifier for identifying blocks across chains.  Ex: eip155:1:15672. */
  BlockID: { input: any; output: any; }
  /** Bytes is an arbitrary length binary string, represented as 0x-prefixed hexadecimal. */
  Bytes: { input: any; output: any; }
  /** Bytes32 is a 32 byte binary string, represented as 0x-prefixed hexadecimal. */
  Bytes32: { input: any; output: any; }
  /** ChainID is a CAIP-2 compliant chain id. */
  ChainID: { input: any; output: any; }
  /** HashID is a ChainID scoped identifier for identifying transactions across chains.  Ex: eip155:1:0xDEAD. */
  HashID: { input: any; output: any; }
  /** IntID is a 64bit integer as a string - this is larger than Javascript's number. */
  IntID: { input: any; output: any; }
  JSON: { input: any; output: any; }
  ProposalID: { input: any; output: any; }
  /** Timestamp is a RFC3339 string. */
  Timestamp: { input: any; output: any; }
  /** Uint256 is a large unsigned integer represented as a string. */
  Uint256: { input: any; output: any; }
  /** The `Upload` scalar type represents a multipart file upload. */
  Upload: { input: any; output: any; }
};

/** Key for use with this API.  See https://docs.tally.xyz/tally-api/welcome#request-an-api-key for how to request & use! */
export type APIKey = {
  __typename?: 'APIKey';
  /** Last four characters of original generated key */
  lastFour: Scalars['String']['output'];
  /** User generated name to differentiate keys */
  name: Scalars['String']['output'];
};

/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type Account = {
  __typename?: 'Account';
  /** AccountActivity (votes, proposals created, etc).  Currently only supports on chain governance. */
  activity?: Maybe<Array<ActivityItem>>;
  /** EVM Address for this `Account` */
  address: Scalars['Address']['output'];
  /** List of APIKeys generated for this account.  See https://docs.tally.xyz/tally-api/welcome#request-an-api-key for how to request & use! */
  apiKeys?: Maybe<Array<APIKey>>;
  /** `Account` bio set on Tally */
  bio: Scalars['String']['output'];
  /** `Account` email set on Tally */
  email: Scalars['String']['output'];
  /** Ethereum Name Service Name */
  ens?: Maybe<Scalars['String']['output']>;
  /** Feature flags */
  features?: Maybe<Array<FeatureState>>;
  id: Scalars['ID']['output'];
  /**
   * Linked Identities: i.e. ENS, Twitter stored in Tally
   * @deprecated ens, twitter available on `Account` type
   */
  identities?: Maybe<Identities>;
  isOFAC: Scalars['Boolean']['output'];
  /** `Account` name set on Tally */
  name: Scalars['String']['output'];
  otherLinks?: Maybe<Array<OtherLink>>;
  /**
   * Governances where an `Account` has a token balance or delegations along with `Account` `Participation`: votes, proposals, stats, delegations, etc.
   * @deprecated use root level delegation queries instead
   */
  participations: Array<Participation>;
  /** Picture URL */
  picture?: Maybe<Scalars['String']['output']>;
  safes?: Maybe<Array<Scalars['AccountID']['output']>>;
  /** Twitter handle */
  twitter?: Maybe<Scalars['String']['output']>;
  type: AccountType;
  votes: Scalars['Uint256']['output'];
};


/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountactivityArgs = {
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<AccountActivitySort>;
};


/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountparticipationsArgs = {
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<Pagination>;
};


/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountvotesArgs = {
  governorId: Scalars['AccountID']['input'];
};

export type AccountActivitySort = {
  field?: InputMaybe<AccountActivitySortField>;
  order?: InputMaybe<SortOrder>;
};

export enum AccountActivitySortField {
  BLOCK_TIMESTAMP = 'BLOCK_TIMESTAMP'
}

export type AccountElectionMeta = {
  __typename?: 'AccountElectionMeta';
  hasRegistered: Scalars['Boolean']['output'];
  isContender: Scalars['Boolean']['output'];
  /** The contender's statement, set during register as candidate flow. */
  statement?: Maybe<Scalars['String']['output']>;
  /** The contender's title, set during register as candidate flow. */
  title?: Maybe<Scalars['String']['output']>;
};

export enum AccountType {
  EOA = 'EOA',
  SAFE = 'SAFE'
}

export type ActivityItem = Proposal | Vote;

export type AddAdminInput = {
  address: Scalars['String']['input'];
  role: OrganizationRole;
};

export type AddressInfo = {
  __typename?: 'AddressInfo';
  accounts: Array<Account>;
  /** Returns a list of `AddressInfo` Activity for a given address across all chains supported by Tally.  Currently only supports on chain governances. */
  activity?: Maybe<Array<ActivityItem>>;
  address: Scalars['Address']['output'];
  /** Account used for SIWE (auth). */
  ethAccount: Account;
  participations: Array<Participation>;
};


export type AddressInfoactivityArgs = {
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<AccountActivitySort>;
};


export type AddressInfoparticipationsArgs = {
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  pagination?: InputMaybe<Pagination>;
};

export type AnalysisDataPoint = {
  __typename?: 'AnalysisDataPoint';
  name: Scalars['String']['output'];
  result: Scalars['Boolean']['output'];
};

export type BalanceItem = {
  __typename?: 'BalanceItem';
  address: Scalars['String']['output'];
  balance: Scalars['String']['output'];
  balance24H: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nativeToken: Scalars['Boolean']['output'];
  quote?: Maybe<Scalars['Float']['output']>;
  quote24H?: Maybe<Scalars['Float']['output']>;
  quoteRate?: Maybe<Scalars['Float']['output']>;
  quoteRate24H?: Maybe<Scalars['Float']['output']>;
  symbol: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Block = {
  __typename?: 'Block';
  id: Scalars['BlockID']['output'];
  number: Scalars['Int']['output'];
  timestamp: Scalars['Timestamp']['output'];
  ts: Scalars['Timestamp']['output'];
};

export type BlockIDInput = {
  blockNumber: Scalars['Int']['input'];
  chain: Scalars['ChainID']['input'];
};

export type Candidate = {
  account: Account;
  totalVoters: Scalars['Int']['output'];
  totalVotes: Scalars['Uint256']['output'];
  votes: Array<CandidateVote>;
};


export type CandidatevotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type CandidateExport = {
  __typename?: 'CandidateExport';
  address: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
};

export enum CandidateSort {
  RANDOM = 'RANDOM',
  VOTES = 'VOTES'
}

export type CandidateVote = {
  __typename?: 'CandidateVote';
  voter: Account;
  weight: Scalars['Uint256']['output'];
};

export type CastVoteActionMetadata = {
  __typename?: 'CastVoteActionMetadata';
  /** Address of the user casting the vote */
  address: Scalars['Address']['output'];
  /** The amount of gas paid for the given meta transaction */
  gasPrice: Scalars['Uint256']['output'];
  /** Address of the governor related to the vote */
  governorId: Scalars['AccountID']['output'];
  /** ID of the proposal related to the dao */
  proposalId: Scalars['ID']['output'];
  /** The vote support as FOR, AGAINST or ABSTAIN */
  support?: Maybe<SupportType>;
  /** Executor's generated transaction id (not the same as chain transaction id) */
  transactionID: Scalars['String']['output'];
  /** Executor's given end date validaty of the transaction */
  validUntil: Scalars['Timestamp']['output'];
};

/** Chain data in the models are only loaded on server startup. If changed please restart the api servers. */
export type Chain = {
  __typename?: 'Chain';
  /** API url of the block explorer */
  blockExplorerAPI: Scalars['String']['output'];
  /** Url of the block explorer */
  blockExplorerURL: Scalars['String']['output'];
  /** Average block time in seconds. */
  blockTime: Scalars['Float']['output'];
  /** Chain as parameter found in the eip. */
  chain: Scalars['String']['output'];
  /** Boolean true if Covalent supports this network in it's API. */
  covalentSupport: Scalars['Boolean']['output'];
  /** Boolean true if Cowswap supports the chain, false if it doesn't. */
  cowswapSupport: Scalars['Boolean']['output'];
  /** Env Explorer Arg, which can be nil, is the env arg name of the key that we will use in the FE */
  envExplorerArg?: Maybe<Scalars['String']['output']>;
  /** Env RPC Arg, which can be nil, is the env arg name of the RPC endpoint that we will use in the FE */
  envRPCArg?: Maybe<Scalars['String']['output']>;
  /** gnosisServiceURL of the chain, can be empty or an string */
  gnosisServiceURL?: Maybe<Scalars['String']['output']>;
  /** Boolean true if Hexagate supports this network in it's API. */
  hexagateAnalysisSupport: Scalars['Boolean']['output'];
  /** The id in eip155:chain_id */
  id: Scalars['ChainID']['output'];
  /** Boolean true if it is a testnet, false if it's not. */
  isTestnet: Scalars['Boolean']['output'];
  /** If chain is an L2, the L1 id in format eip155:chain_id */
  layer1Id?: Maybe<Scalars['ChainID']['output']>;
  /** Chain name with removed redundancy and unnecessary words. e.g.: Ethereum Rinkeby */
  mediumName: Scalars['String']['output'];
  /** Contract address of Milkman (for Cowswap proposals). */
  milkmanContract?: Maybe<Scalars['AccountID']['output']>;
  /** Chain name as found in eip lists. e.g.: Ethereum Testnet Rinkeby */
  name: Scalars['String']['output'];
  /** Data from chain native currency. */
  nativeCurrency: NativeCurrency;
  /** Chain short name as found in eip lists. The Acronym of it. e.g.: rin */
  shortName: Scalars['String']['output'];
  /** Icon SVG of the chain logo. */
  svg?: Maybe<Scalars['String']['output']>;
  /** Boolean true if Tenderly supports simulations. */
  tenderlySupport: Scalars['Boolean']['output'];
  /** Boolean true if L2 depends on L1 for voting period, false if it doesn't. */
  useLayer1VotingPeriod: Scalars['Boolean']['output'];
};

/** The `ClaimAndDelegateAttempt` type represents the stored attempt of a user that tried to call claimAndDelegate. */
export type ClaimAndDelegateAttempt = {
  __typename?: 'ClaimAndDelegateAttempt';
  createdAt: Scalars['Timestamp']['output'];
  delegateeId: Scalars['AccountID']['output'];
  delegatorId: Scalars['AccountID']['output'];
  expiry: Scalars['Uint256']['output'];
  parameterR: Scalars['Bytes32']['output'];
  parameterS: Scalars['Bytes32']['output'];
  parameterV: Scalars['Uint256']['output'];
  proof?: Maybe<Array<Scalars['String']['output']>>;
  tokenId: Scalars['AssetID']['output'];
  txID: Scalars['HashID']['output'];
};

export type Collectible = {
  __typename?: 'Collectible';
  ID: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  imageURI?: Maybe<Scalars['String']['output']>;
  logoURI: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tokenName: Scalars['String']['output'];
  tokenSymbol: Scalars['String']['output'];
  uri?: Maybe<Scalars['String']['output']>;
};

export type Confirmation = {
  __typename?: 'Confirmation';
  owner: Account;
  signature: Scalars['Bytes']['output'];
  signatureType: Scalars['String']['output'];
  submissionDate: Scalars['Timestamp']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  discord: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  twitter: Scalars['String']['output'];
};

export type ContactInput = {
  discord: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  twitter: Scalars['String']['input'];
};

export type Contender = Candidate & {
  __typename?: 'Contender';
  account: Account;
  accountElectionMeta: AccountElectionMeta;
  id: Scalars['ID']['output'];
  nominated: Scalars['Boolean']['output'];
  rejected: Scalars['Boolean']['output'];
  totalVoters: Scalars['Int']['output'];
  totalVotes: Scalars['Uint256']['output'];
  votes: Array<CandidateVote>;
};


export type ContendervotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export enum ContenderFilter {
  ALL = 'ALL',
  QUALIFIED = 'QUALIFIED',
  SEEKING_VOTES = 'SEEKING_VOTES'
}

export type ContractVerification = {
  __typename?: 'ContractVerification';
  isVerified: Scalars['Boolean']['output'];
};

export type Contracts = {
  __typename?: 'Contracts';
  governor: GovernorContract;
  tokens: Array<TokenContract>;
};

export type Council = {
  __typename?: 'Council';
  cohortSize: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  elections: Array<Election>;
  id: Scalars['Int']['output'];
  members: CouncilMembers;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};


export type CouncilelectionsArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type CouncilMembers = {
  __typename?: 'CouncilMembers';
  firstCohort: Array<Account>;
  secondCohort: Array<Account>;
};

export type CovalentData = {
  __typename?: 'CovalentData';
  decimals: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
};

export type CreateGovernorOrganizationInput = {
  governor: OrganizationGovernorInput;
  organization: CreateOrganizationInput;
  token: OrganizationTokenInput;
};

export type CreateOrganizationInput = {
  metadata?: InputMaybe<OrganizationMetadataInput>;
  name: Scalars['String']['input'];
  uxVersion?: InputMaybe<OrgUxVersion>;
};

export type CreateSafeInput = {
  id: Scalars['AccountID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['IntID']['input'];
};

/** A single parameter used in a method. */
export type DecodedParameter = {
  __typename?: 'DecodedParameter';
  /** Decoded calls in the case of a `transactions` parameter on multisend contract or similar. */
  calls?: Maybe<Array<ExecutableCall>>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['Bytes']['output'];
};

export type Delegate = {
  __typename?: 'Delegate';
  account: Account;
  delegatorsCount: Scalars['Int']['output'];
  id: Scalars['IntID']['output'];
  proposalsCount?: Maybe<Scalars['Int']['output']>;
  statement?: Maybe<DelegateStatement>;
  statementV2?: Maybe<DelegateStatement>;
  token?: Maybe<Token>;
  voteChanges: Array<VotingPowerChange>;
  votesCount: Scalars['Uint256']['output'];
};


export type DelegatestatementArgs = {
  governanceId: Scalars['AccountID']['input'];
};

export type DelegateActionMetadata = {
  __typename?: 'DelegateActionMetadata';
  /** Address of the user receiving the delegation */
  delegatee: Scalars['Address']['output'];
  /** Address of the user delegating using a meta transaction action */
  from: Scalars['Address']['output'];
  /** The amount of gas paid for the given meta transaction */
  gasPrice: Scalars['Uint256']['output'];
  /** The DAO contract chain scoped information */
  tokenContractId: Scalars['AssetID']['output'];
  /** Executor's generated transaction id (not the same as chain transaction id) */
  transactionId: Scalars['String']['output'];
  /** Executor's given end date validaty of the transaction */
  validUntil: Scalars['Timestamp']['output'];
};

export type DelegateFilter = {
  field?: InputMaybe<DelegateFilterField>;
  issueID?: InputMaybe<Scalars['IntID']['input']>;
};

export enum DelegateFilterField {
  SEEKING_DELEGATIONS = 'SEEKING_DELEGATIONS'
}

export type DelegateInput = {
  address: Scalars['Address']['input'];
  governorId?: InputMaybe<Scalars['AccountID']['input']>;
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
};

export type DelegateSort = {
  field?: InputMaybe<DelegateSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum DelegateSortField {
  CREATED = 'CREATED',
  DELEGATIONS = 'DELEGATIONS',
  HAS_DELEGATE_STATEMENT = 'HAS_DELEGATE_STATEMENT',
  HAS_ENS = 'HAS_ENS',
  PROPOSALS_CREATED = 'PROPOSALS_CREATED',
  TOKENS_OWNED = 'TOKENS_OWNED',
  UPDATED = 'UPDATED',
  VOTES_CAST = 'VOTES_CAST',
  VOTING_WEIGHT = 'VOTING_WEIGHT'
}

export type DelegateStatement = {
  __typename?: 'DelegateStatement';
  address: Scalars['Address']['output'];
  dataSource: DelegateStatementSource;
  dataSourceURL?: Maybe<Scalars['String']['output']>;
  /** @deprecated use address instead */
  delegateAddress: Scalars['Address']['output'];
  /** @deprecated use statement instead */
  delegateStatement: Scalars['String']['output'];
  /** @deprecated use statementSummary instead */
  delegateStatementSummary?: Maybe<Scalars['String']['output']>;
  discourseProfileLink?: Maybe<Scalars['String']['output']>;
  /** @deprecated use discourseUsername */
  discourseUserName?: Maybe<Scalars['String']['output']>;
  discourseUsername?: Maybe<Scalars['String']['output']>;
  id: Scalars['IntID']['output'];
  isSeekingDelegation?: Maybe<Scalars['Boolean']['output']>;
  issues?: Maybe<Array<OrganizationIssue>>;
  organizationID: Scalars['IntID']['output'];
  /** @deprecated use isSeekingDelegation instead */
  seekingDelegations?: Maybe<Scalars['Boolean']['output']>;
  statement: Scalars['String']['output'];
  statementSummary?: Maybe<Scalars['String']['output']>;
};

export type DelegateStatementSort = {
  field?: InputMaybe<DelegateStatementSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum DelegateStatementSortField {
  CREATED = 'CREATED',
  DELEGATE_STATEMENT_SUMMARY = 'DELEGATE_STATEMENT_SUMMARY'
}

export enum DelegateStatementSource {
  SCRIPT = 'SCRIPT',
  USER = 'USER'
}

export type DelegatesFiltersInput = {
  governanceId?: InputMaybe<Scalars['AccountID']['input']>;
  isSeekingDelegation?: InputMaybe<Scalars['Boolean']['input']>;
  issueIds?: InputMaybe<Array<Scalars['IntID']['input']>>;
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
};

export type DelegatesInput = {
  filters: DelegatesFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<DelegatesSortInput>;
};

export enum DelegatesSortBy {
  /** Sorts by total delegators. */
  DELEGATORS = 'DELEGATORS',
  /** The default sorting method. It sorts by date. */
  RANDOM = 'RANDOM',
  /** Sorts by voting power. */
  VOTES = 'VOTES'
}

export type DelegatesSortInput = {
  isDescending: Scalars['Boolean']['input'];
  sortBy: DelegatesSortBy;
};

export type Delegation = {
  __typename?: 'Delegation';
  /** The `Block` when the `Delegation` took place */
  block: Block;
  /** Actor who is delegating their voting power */
  delegator: Account;
  /** The `Account` this voting power was delegated to before this `Delegation` event */
  from: Account;
  /** The `Account` to whom the voting power is not delegated */
  to: Account;
  /** `Token` contract where this `Delegation` was created */
  token: Token;
  /** Voting Power delegated at time of delegation */
  votingPower: Scalars['Uint256']['output'];
  /** @deprecated renamed for clarity to `votingPower` */
  weight: Scalars['Uint256']['output'];
};

/** The `DelegationAttempt` type represents the stored attempt of a user that tried to delegate. */
export type DelegationAttempt = {
  __typename?: 'DelegationAttempt';
  createdAt: Scalars['Timestamp']['output'];
  delegateeId: Scalars['AccountID']['output'];
  delegatorId: Scalars['AccountID']['output'];
  governanceId: Scalars['AccountID']['output'];
  txID: Scalars['HashID']['output'];
};

export type DelegationInput = {
  address: Scalars['Address']['input'];
  governorId: Scalars['AccountID']['input'];
};

export type DelegationV2 = {
  __typename?: 'DelegationV2';
  blockNumber: Scalars['Int']['output'];
  blockTimestamp: Scalars['Timestamp']['output'];
  delegate: Delegate;
  delegator: Account;
  token: Token;
  votes: Scalars['Uint256']['output'];
};

export type DelegationWeightChange = {
  __typename?: 'DelegationWeightChange';
  block?: Maybe<Block>;
  delegate: Account;
  hash?: Maybe<Scalars['Bytes32']['output']>;
  netChange: Scalars['Uint256']['output'];
  newBalance: Scalars['Uint256']['output'];
  prevBalance: Scalars['Uint256']['output'];
  timestamp: Scalars['Timestamp']['output'];
  token: Token;
};

export type DelegationWeightChangeSort = {
  field?: InputMaybe<DelegationWeightChangeSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum DelegationWeightChangeSortField {
  CREATED = 'CREATED',
  NET_CHANGE = 'NET_CHANGE',
  NEW_BALANCE = 'NEW_BALANCE',
  OLD_BALANCE = 'OLD_BALANCE'
}

export type DelegationWeightStats = {
  __typename?: 'DelegationWeightStats';
  in: Scalars['Uint256']['output'];
  out: Scalars['Uint256']['output'];
};

export type DelegationsFiltersInput = {
  address: Scalars['Address']['input'];
  governorId?: InputMaybe<Scalars['AccountID']['input']>;
};

export type DelegationsInput = {
  filters: DelegationsFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<DelegationsSortInput>;
};

export enum DelegationsSortBy {
  /** The default sorting method. It sorts by date. */
  ID = 'ID',
  /** Sorts by voting power. */
  VOTES = 'VOTES'
}

export type DelegationsSortInput = {
  isDescending: Scalars['Boolean']['input'];
  sortBy: DelegationsSortBy;
};

export type Election = {
  __typename?: 'Election';
  accountElectionMeta: AccountElectionMeta;
  councilId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** 2nd round of election. */
  memberRound?: Maybe<MemberRound>;
  /** 1st round of election. */
  nominationRound: NominationRound;
  /** Election number, incremental. */
  number: Scalars['Int']['output'];
  status: ElectionStatus;
};


export type ElectionaccountElectionMetaArgs = {
  address: Scalars['String']['input'];
};

export enum ElectionStatus {
  COMPLETE = 'COMPLETE',
  GRACE = 'GRACE',
  MEMBER = 'MEMBER',
  NOMINATION = 'NOMINATION'
}

export type Eligibility = {
  __typename?: 'Eligibility';
  /** Amount the account can claim from this token */
  amount?: Maybe<Scalars['Uint256']['output']>;
  proof?: Maybe<Array<Scalars['String']['output']>>;
  /** Whether the account is eligible to claim */
  status: EligibilityStatus;
  tx?: Maybe<Scalars['HashID']['output']>;
};

export enum EligibilityStatus {
  CLAIMED = 'CLAIMED',
  ELIGIBLE = 'ELIGIBLE',
  NOTELIGIBLE = 'NOTELIGIBLE'
}

/** Executable payload of a proposal.  This is contains four arrays each of which contain an element for each action included. */
export type Executable = {
  __typename?: 'Executable';
  /** Call data sent */
  callDatas: Array<Scalars['Bytes']['output']>;
  /** Method signatures for the target.  Only set in Alpha and Bravo style Governors. */
  signatures: Array<Scalars['Bytes']['output']>;
  /** Contract targets */
  targets: Array<Scalars['Address']['output']>;
  /** Amount of native asset to be transferred */
  values: Array<Scalars['Uint256']['output']>;
};

/** Describes what happens if a given `Proposal` or `GnosisSafeTransaction` is executed. A call can have an unlimited amount of nested parameters which can have their own calls in the case of a common initial call to a multisend contract. */
export type ExecutableCall = {
  __typename?: 'ExecutableCall';
  /** Input data that will be sent to the target method.  Individual parameters derived from this data are available on the parameters field if decoding succeeds. */
  data?: Maybe<Scalars['Bytes']['output']>;
  /** Media context i.e. invoice file */
  media?: Maybe<Scalars['String']['output']>;
  /** Transfer recipe memo */
  memo?: Maybe<Scalars['String']['output']>;
  /** Off-chain metadata for the call. Currently only implemented for Swap proposal. */
  meta?: Maybe<ExecutableCallMeta>;
  /** Method to be called on the target smart contract. */
  method?: Maybe<Scalars['String']['output']>;
  /** `DecodedParameter`s sent to the method on the target contract. */
  parameters?: Maybe<Array<DecodedParameter>>;
  /** Tally `Recipe` that was used to create this call. */
  recipe?: Maybe<Recipe>;
  /** List of simulations, the first being the latest attempt. */
  simulations?: Maybe<Array<Simulation>>;
  /** `AccountID` of contract that will be called. */
  target: Scalars['AccountID']['output'];
  /** Amount of native asset that will be sent to the target contract & method. */
  value?: Maybe<Scalars['Uint256']['output']>;
};

export type ExecutableCallMeta = RewardsMeta | SwapRecipeMeta;

export type FeatureState = {
  __typename?: 'FeatureState';
  account?: Maybe<Account>;
  enabled: Scalars['Boolean']['output'];
  governance?: Maybe<Governance>;
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
};

/** The `File` type, represents the response of uploading a file. */
export type File = {
  __typename?: 'File';
  contentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata: Image;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GnosisSafe = {
  __typename?: 'GnosisSafe';
  /** Values of all Tokens in this Gnosis Safe */
  balance?: Maybe<Treasury>;
  collectibles?: Maybe<Array<Maybe<Collectible>>>;
  /** GnosisSafe smart contract AccountID. */
  id: Scalars['AccountID']['output'];
  /** GnosisSafe name to help distinguish it. */
  name?: Maybe<Scalars['String']['output']>;
  /** A counter of the amount of transactions executed on the safe. */
  nonce?: Maybe<Scalars['Int']['output']>;
  /** A list of owner Accounts.  The Account includes participations, but we haven't included gnosis safe owners or signers in the participations yet. */
  owners?: Maybe<Array<Account>>;
  /** The amount of confirmations (owner signatures) that are required to execute a transaction. */
  threshold?: Maybe<Scalars['Int']['output']>;
  /** GnosisSafe smart contract version. */
  version?: Maybe<Scalars['String']['output']>;
};

/** A transaction can be `SUBMITTED` or `EXECUTED`. An `EXECUTED` transaction will include a block and an on chain txHashID. */
export type GnosisSafeTransaction = {
  __typename?: 'GnosisSafeTransaction';
  /** `Block` at which this safe transaction was executed. */
  block?: Maybe<Block>;
  /** Describes what happens if it is executed.  This includes a `target` smart contract address as well as the method and input data being used to make the call.  A call can have an unlimited amount of nested `parameters` which can have their own calls in the case of a common initial call to a multisend contract.  Each call includes a `recipe` placeholder if the call was created on Tally. */
  call?: Maybe<ExecutableCall>;
  /** All the owners that have signed the transaction. */
  confirmations: Array<Confirmation>;
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  id: Scalars['HashID']['output'];
  /** Current counter of multisig transactions executed on this safe.  No two transactions on this contract will have the same `nonce`. */
  nonce?: Maybe<Scalars['Uint256']['output']>;
  /** `GnosisSafe` smart contract AccountID. */
  safeID: Scalars['AccountID']['output'];
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  safeTxHashID?: Maybe<Scalars['HashID']['output']>;
  /** Executed transaction verified signatures. */
  signatures?: Maybe<Scalars['Bytes']['output']>;
  /** A list of all states the transaction has been through with a timestamp.  A transaction can be `SUBMITTED` or `EXECUTED`.  Similar to a governor proposal. */
  statusChanges: Array<GnosisStatusChange>;
  /** Ethereum transaction hash of the executed transaction. */
  txHashID?: Maybe<Scalars['HashID']['output']>;
};

export type GnosisSafesInput = {
  organizationIds?: InputMaybe<Array<Scalars['IntID']['input']>>;
};

export type GnosisStatusChange = {
  __typename?: 'GnosisStatusChange';
  timestamp: Scalars['Timestamp']['output'];
  type: GnosisStatusChangeType;
};

export enum GnosisStatusChangeType {
  EXECUTED = 'EXECUTED',
  SUBMITTED = 'SUBMITTED'
}

export type Governance = {
  __typename?: 'Governance';
  active: Scalars['Boolean']['output'];
  balance: Scalars['Uint256']['output'];
  chainId: Scalars['ChainID']['output'];
  contracts: Contracts;
  delegatedVotingPower: Scalars['Uint256']['output'];
  /** @deprecated use root level `delegates` */
  delegates: Array<Participation>;
  features?: Maybe<Array<FeatureState>>;
  id: Scalars['AccountID']['output'];
  isBehind: Scalars['Boolean']['output'];
  isIndexing: Scalars['Boolean']['output'];
  kind: MultiGovernanceSupport;
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  parameters: GovernorParameters;
  proposalThreshold: Scalars['Uint256']['output'];
  proposals: Array<Proposal>;
  quorum: Scalars['Uint256']['output'];
  slug: Scalars['String']['output'];
  stats: GovernanceStats;
  tallyProposals: Array<TallyProposal>;
  timelockId?: Maybe<Scalars['AccountID']['output']>;
  tokens: Array<Token>;
};


export type GovernancebalanceArgs = {
  id: Scalars['AccountID']['input'];
};


export type GovernancedelegatedVotingPowerArgs = {
  id: Scalars['AccountID']['input'];
};


export type GovernancedelegatesArgs = {
  filter?: InputMaybe<DelegateFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<DelegateSort>;
};


export type GovernanceproposalsArgs = {
  pagination?: InputMaybe<Pagination>;
  proposalIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  proposerIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  proposers?: InputMaybe<Array<Scalars['Address']['input']>>;
  sort?: InputMaybe<ProposalSort>;
};


export type GovernancetallyProposalsArgs = {
  creatorIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<TallyProposalSort>;
};

export type GovernanceStats = {
  __typename?: 'GovernanceStats';
  proposals: ProposalStats;
  tokens: GovernanceTokenStats;
};

export type GovernanceSync = {
  __typename?: 'GovernanceSync';
  id: Scalars['AccountID']['output'];
  start: Scalars['Int']['output'];
  tokenId: Scalars['AssetID']['output'];
  type: GovernanceType;
};

export type GovernanceTokenStats = {
  __typename?: 'GovernanceTokenStats';
  delegatedVotingPower: Scalars['Uint256']['output'];
  delegates: TokenDelegateStats;
  owners: Scalars['Int']['output'];
  supply: Scalars['Uint256']['output'];
  voters: Scalars['Int']['output'];
};

/** Governor contract type */
export enum GovernanceType {
  aave = 'aave',
  governoralpha = 'governoralpha',
  governorbravo = 'governorbravo',
  nounsfork = 'nounsfork',
  openzeppelingovernor = 'openzeppelingovernor'
}

export type GovernanceTypeData = {
  __typename?: 'GovernanceTypeData';
  name: Scalars['String']['output'];
  type: GovernanceType;
};

/** Core type that describes an onchain Governor contract */
export type Governor = {
  __typename?: 'Governor';
  /** Current tokens owned by a particular address */
  balance: Scalars['Uint256']['output'];
  contracts: Contracts;
  /** Current voting power of a particular address */
  delegatedVotingPower: Scalars['Uint256']['output'];
  /**
   * List of users that can currently create proposals and vote.
   * @deprecated use root level `delegates`
   */
  delegates: Array<Participation>;
  features?: Maybe<Array<FeatureState>>;
  id: Scalars['AccountID']['output'];
  isBehind: Scalars['Boolean']['output'];
  isIndexing: Scalars['Boolean']['output'];
  kind: MultiGovernanceSupport;
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block;
  /** Tally name of the governor contract */
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  parameters: GovernorParameters;
  /** Counts of total, active, failed, and passed proosals. */
  proposalStats: ProposalStats;
  proposalThreshold: Scalars['Uint256']['output'];
  /** Proposals created using this Governor contract */
  proposals: Array<Proposal>;
  /** The minumum amount of votes (total or for depending on type) that are currently required to pass a proposal. */
  quorum: Scalars['Uint256']['output'];
  /** Tally slug used for this goverance: tally.xyz/gov/[slug] */
  slug: Scalars['String']['output'];
  /** Chain scoped address of the timelock contract for this governor if it exists. */
  timelockId?: Maybe<Scalars['AccountID']['output']>;
  tokenStats: GovernanceTokenStats;
  /** List of related tokens used to operate this contract.  Most governors only have one. */
  tokens: Array<Token>;
  /** Governor contract type */
  type: GovernanceType;
};


/** Core type that describes an onchain Governor contract */
export type GovernorbalanceArgs = {
  id: Scalars['AccountID']['input'];
};


/** Core type that describes an onchain Governor contract */
export type GovernordelegatedVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['AccountID']['input'];
};


/** Core type that describes an onchain Governor contract */
export type GovernordelegatesArgs = {
  filter?: InputMaybe<DelegateFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<DelegateSort>;
};


/** Core type that describes an onchain Governor contract */
export type GovernorproposalsArgs = {
  pagination?: InputMaybe<Pagination>;
  proposalIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  proposerIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  proposers?: InputMaybe<Array<Scalars['Address']['input']>>;
  sort?: InputMaybe<ProposalSort>;
};

export type GovernorAaveParameters = {
  __typename?: 'GovernorAaveParameters';
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars['Uint256']['output'];
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars['Uint256']['output']>;
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars['Uint256']['output'];
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars['Uint256']['output'];
};

export type GovernorAlphaParameters = {
  __typename?: 'GovernorAlphaParameters';
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars['Uint256']['output'];
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars['Uint256']['output']>;
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars['Uint256']['output'];
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars['Uint256']['output'];
};

export type GovernorBravoParameters = {
  __typename?: 'GovernorBravoParameters';
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars['Uint256']['output'];
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars['Uint256']['output']>;
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars['Uint256']['output'];
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars['Uint256']['output'];
};

export type GovernorContract = {
  __typename?: 'GovernorContract';
  address: Scalars['Address']['output'];
  lastBlock: Scalars['Int']['output'];
  type: GovernanceType;
};

export type GovernorExecutableCallInput = {
  /** Input data that will be sent to the target method.  Individual parameters derived from this data are available on the parameters field if decoding succeeds. */
  data: Scalars['Bytes']['input'];
  /** Media context i.e. invoice file */
  media?: InputMaybe<Scalars['String']['input']>;
  /** Transfer recipe memo */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** Meta is extra offchain data. Currently only supported for SWAP & REWARDS recipes. */
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** Method to be called on the target smart contract. */
  method?: InputMaybe<Scalars['String']['input']>;
  /** Tally `Recipe` that was used to create this call. */
  recipe: Recipe;
  /** `AccountID` of contract that will be called. */
  target: Scalars['AccountID']['input'];
  /** Amount of native asset that will be sent to the target contract & method. */
  value: Scalars['Uint256']['input'];
};

export type GovernorInput = {
  id?: InputMaybe<Scalars['AccountID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type GovernorParameters = GovernorAaveParameters | GovernorAlphaParameters | GovernorBravoParameters | NounsForkGovernorParameters | OpenZeppelinGovernorParameters;

export type GovernorSort = {
  field?: InputMaybe<GovernorSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum GovernorSortField {
  ACTIVE_PROPOSALS = 'ACTIVE_PROPOSALS',
  TOTAL_PROPOSALS = 'TOTAL_PROPOSALS'
}

/** Current token stats */
export type GovernorTokenStats = {
  __typename?: 'GovernorTokenStats';
  /** Total delegated voting power from `DelegateVotesChanged` events */
  delegatedVotingPower: Scalars['Uint256']['output'];
  /** Number of addresses with non-zero balances of this token derived from `Transfer` events */
  owners: Scalars['Int']['output'];
  /** Supply derived from `Transfer` events */
  supply: Scalars['Uint256']['output'];
  /** Number of addresses with non-zero voting power of this token derived from `DelegateVotesChanged` events */
  voters: Scalars['Int']['output'];
};

/** Governor contract type */
export enum GovernorType {
  aave = 'aave',
  governoralpha = 'governoralpha',
  governorbravo = 'governorbravo',
  nounsfork = 'nounsfork',
  openzeppelingovernor = 'openzeppelingovernor'
}

export type GovernorV2 = {
  __typename?: 'GovernorV2';
  id: Scalars['AccountID']['output'];
  parameters: GovernorV2Parameters;
  timelockId?: Maybe<Scalars['AccountID']['output']>;
  tokenId: Scalars['AssetID']['output'];
  type: GovernorType;
};

export type GovernorV2Parameters = {
  __typename?: 'GovernorV2Parameters';
  clockMode?: Maybe<Scalars['String']['output']>;
  fullWeightDuration?: Maybe<Scalars['Uint256']['output']>;
  gracePeriod?: Maybe<Scalars['Uint256']['output']>;
  nomineeVettingDuration?: Maybe<Scalars['Uint256']['output']>;
  proposalThreshold?: Maybe<Scalars['Uint256']['output']>;
  quorumDenominator?: Maybe<Scalars['Uint256']['output']>;
  quorumNumerator?: Maybe<Scalars['Uint256']['output']>;
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  votingDelay?: Maybe<Scalars['Uint256']['output']>;
  votingPeriod?: Maybe<Scalars['Uint256']['output']>;
};

export type GovernorsFiltersInput = {
  organizationId: Scalars['IntID']['input'];
};

export type GovernorsInput = {
  filters: GovernorsFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<GovernorsSortInput>;
};

export enum GovernorsSortBy {
  /** The default sorting method. It sorts by date. */
  ID = 'ID'
}

export type GovernorsSortInput = {
  isDescending: Scalars['Boolean']['input'];
  sortBy: GovernorsSortBy;
};

/** Identity Providers associated with an `Account`. */
export type Identities = {
  __typename?: 'Identities';
  /** Ethereum Name Service */
  ens?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type IdentitiesInput = {
  twitter?: InputMaybe<TwitterIdentity>;
};

export type Image = {
  __typename?: 'Image';
  thumbnail?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Issue = {
  __typename?: 'Issue';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['IntID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['IntID']['output']>;
};

export type IssueInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
};

export type IssuesFiltersInput = {
  governanceId?: InputMaybe<Scalars['AccountID']['input']>;
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
};

export type IssuesInput = {
  filters?: InputMaybe<IssuesFiltersInput>;
};

export type JoinOrganizationInput = {
  id: Scalars['IntID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Member = {
  __typename?: 'Member';
  account: Account;
  id: Scalars['ID']['output'];
  organization: Organization;
  /** Number of polls the member has voted on. */
  pollVotesCount: Scalars['Int']['output'];
  role: OrganizationRole;
};

export type MemberRound = Round & {
  __typename?: 'MemberRound';
  availableVotes: Scalars['Uint256']['output'];
  end: Block;
  fullWeightDuration: Scalars['Uint256']['output'];
  id: Scalars['ProposalID']['output'];
  nominees: Array<Nominee>;
  start: Block;
  status: RoundStatus;
  votesToWeight: Scalars['Uint256']['output'];
};


export type MemberRoundavailableVotesArgs = {
  address: Scalars['String']['input'];
};


export type MemberRoundnomineesArgs = {
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<CandidateSort>;
};


export type MemberRoundvotesToWeightArgs = {
  votes: Scalars['Uint256']['input'];
};

export type MetaTransaction = {
  __typename?: 'MetaTransaction';
  action: MetaTransactionAction;
  address: Scalars['Address']['output'];
  createdAt: Scalars['Timestamp']['output'];
  governorId: Scalars['AccountID']['output'];
  id: Scalars['ID']['output'];
  metadata: MetaTransactionActionMetadata;
};

export enum MetaTransactionAction {
  CAST_VOTE = 'CAST_VOTE',
  DELEGATE = 'DELEGATE'
}

export type MetaTransactionActionMetadata = CastVoteActionMetadata | DelegateActionMetadata;

export type MetaTransactionSort = {
  field?: InputMaybe<MetaTransactionSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum MetaTransactionSortField {
  CREATED = 'CREATED'
}

export enum MultiGovernanceSupport {
  MULTI_GOV_PRIMARY = 'MULTI_GOV_PRIMARY',
  MULTI_GOV_SECONDARY = 'MULTI_GOV_SECONDARY',
  SINGLE_GOV = 'SINGLE_GOV'
}

export type Mutation = {
  __typename?: 'Mutation';
  addWhitelabelDomain: Scalars['Boolean']['output'];
  analyticsBackfill: Scalars['Boolean']['output'];
  /** Archives a `TallyProposal`. */
  archiveProposal: Scalars['Boolean']['output'];
  /** Creates an API Key for the logged in User */
  createAPIKey: Scalars['String']['output'];
  createCastVoteMetaTransaction: MetaTransaction;
  /** Creates a `ClaimAndDelegateAttempt` with the data called by the user. */
  createClaimAndDelegateAttempt: Scalars['Boolean']['output'];
  createDelegateMetaTransaction: MetaTransaction;
  createDelegateStatement: DelegateStatement;
  createDelegateStatementV2: DelegateStatement;
  /** Creates a `DelegationAttempt` with the user intended to delegate */
  createDelegationAttempt: Scalars['Boolean']['output'];
  /** Creates a Governance on Tally associated with an Organization.  If the Governance is already indexed it only updates the Organization. */
  createGovernance: Scalars['Boolean']['output'];
  createGovernanceV2: Scalars['Boolean']['output'];
  /** Creates an organization with a governor and token. */
  createGovernorOrganization: Organization;
  /** Creates an organization for a group. Adds a demo proposal for that group. */
  createGroupOrganization: Organization;
  createIssue: Scalars['Boolean']['output'];
  createOrganization: Organization;
  createPoll: Scalars['String']['output'];
  /** Creates a `TallyProposal`. Returns a TallyProposal ID. */
  createProposal: Scalars['ID']['output'];
  createProposalActionAttempt: Scalars['Boolean']['output'];
  /** Creates a `TallyProposal` with a `Poll`, which immediately begins voting. Returns a Poll ID. */
  createProposalWithPoll: Scalars['ID']['output'];
  /** Creates a `TallyProposal` with a `Poll` for a Group. Returns a Poll ID. */
  createProposalWithPollForGroup: Scalars['ID']['output'];
  createProposalWithPollForGroupV2: Scalars['ID']['output'];
  /** Much like governors we can add a safe to an existing DAO.  A DAO can have an unlimited amount of `GnosisSafe`s. */
  createSafe: Scalars['Boolean']['output'];
  createSafeV2: Scalars['Boolean']['output'];
  /** Begins indexer sync for the requested token */
  createToken: Scalars['Boolean']['output'];
  /** Creates a `VoteAttempt` with the user intended vote and support data */
  createVoteAttempt: Scalars['Boolean']['output'];
  deleteIssue: Scalars['Boolean']['output'];
  deleteSync: Scalars['Boolean']['output'];
  disableWhitelabelDomain: Scalars['Boolean']['output'];
  ingestOFACAddresses: Scalars['Boolean']['output'];
  /** Adds the authenticated user to the organization. */
  joinOrganization: Scalars['Boolean']['output'];
  /** Links a Governance to an Organization if it is unlinked.  Fails if Governance doesn't exist or isn't indexed. */
  linkGovernance: Governance;
  linkGovernanceV2: Governance;
  login: Scalars['String']['output'];
  loginAsSafe: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  /** pauseSync, when pause syncing events from a contrat. */
  pauseSync: Scalars['Boolean']['output'];
  registerAsContenderAttempt: Scalars['Boolean']['output'];
  /** Restores a previous version of a proposal draft as the latest proposal. */
  restorePreviousProposalDraft: Scalars['Boolean']['output'];
  /** ResumeSync, resumes syncing an contract. */
  resumeSync: Scalars['Boolean']['output'];
  runProposalSimulation: Array<Simulation>;
  setArbitrumProposalExecuted: Scalars['Boolean']['output'];
  /** SyncNewContract, used by admin/developers to try new processors */
  syncNewContract: Scalars['Boolean']['output'];
  /** Unlinks a Safe from it's Organization for linking to other Organizations */
  unlinkGnosisSafe: Scalars['Boolean']['output'];
  /** Unlinks a Governance from it's Organization for linking to other Organizations */
  unlinkGovernance: Governance;
  /** Updates tally stored `Account` metadata (name, bio, picture, email, identity providers, etc) */
  updateAccount: Scalars['Boolean']['output'];
  /** Updates an Account for a user via their account id */
  updateAccountByID: Scalars['Boolean']['output'];
  updateCandidateProfile: Scalars['Boolean']['output'];
  updateChain: Chain;
  updateFeature: FeatureState;
  /** Updates a Governance data using the given input parameters */
  updateGovernance: Governance;
  updateOrganization: Organization;
  /** Updates the admins of organization. `remove` should be a list of member IDs. */
  updateOrganizationAdmins: Scalars['Boolean']['output'];
  /** Updates the organization password. */
  updateOrganizationPassword: Scalars['Boolean']['output'];
  /** Updates the voting parameters of organization. */
  updateOrganizationVotingParameters: Scalars['Boolean']['output'];
  updateParametersOZ: Scalars['Boolean']['output'];
  /** Updates a `TallyProposal`. */
  updateProposal: Scalars['Boolean']['output'];
  /** We are able to use updateSafe to change a gnosis safe name. */
  updateSafe: Scalars['Boolean']['output'];
  upload: File;
  upsertDelegateProfile: DelegateStatement;
  upsertDelegateProfileV2: DelegateStatement;
  vote: Scalars['Boolean']['output'];
};


export type MutationaddWhitelabelDomainArgs = {
  domain: Scalars['String']['input'];
};


export type MutationarchiveProposalArgs = {
  originalProposalId: Scalars['ID']['input'];
};


export type MutationcreateAPIKeyArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateCastVoteMetaTransactionArgs = {
  address: Scalars['Address']['input'];
  gasPrice: Scalars['Uint256']['input'];
  governorId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
  support: SupportType;
  transactionId: Scalars['String']['input'];
  validUntil: Scalars['Timestamp']['input'];
};


export type MutationcreateClaimAndDelegateAttemptArgs = {
  delegateeId: Scalars['AccountID']['input'];
  delegatorId: Scalars['AccountID']['input'];
  expiry: Scalars['Uint256']['input'];
  parameterR: Scalars['Bytes32']['input'];
  parameterS: Scalars['Bytes32']['input'];
  parameterV: Scalars['Uint256']['input'];
  proof?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId: Scalars['AssetID']['input'];
  txID: Scalars['HashID']['input'];
};


export type MutationcreateDelegateMetaTransactionArgs = {
  address: Scalars['Address']['input'];
  delegatee: Scalars['Address']['input'];
  from: Scalars['Address']['input'];
  gasPrice: Scalars['Uint256']['input'];
  governorId: Scalars['AccountID']['input'];
  tokenContractId: Scalars['AssetID']['input'];
  transactionId: Scalars['String']['input'];
  validUntil: Scalars['Timestamp']['input'];
};


export type MutationcreateDelegateStatementArgs = {
  dataSource: DelegateStatementSource;
  dataSourceURL?: InputMaybe<Scalars['String']['input']>;
  delegateAddress: Scalars['Address']['input'];
  delegateStatement: Scalars['String']['input'];
  delegateStatementSummary?: InputMaybe<Scalars['String']['input']>;
  discourseProfileLink?: InputMaybe<Scalars['String']['input']>;
  discourseUserName?: InputMaybe<Scalars['String']['input']>;
  organizationID: Scalars['String']['input'];
  seekingDelegations?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateDelegateStatementV2Args = {
  dataSource: DelegateStatementSource;
  dataSourceURL?: InputMaybe<Scalars['String']['input']>;
  delegateAddress: Scalars['Address']['input'];
  delegateStatement: Scalars['String']['input'];
  delegateStatementSummary?: InputMaybe<Scalars['String']['input']>;
  discourseProfileLink?: InputMaybe<Scalars['String']['input']>;
  discourseUserName?: InputMaybe<Scalars['String']['input']>;
  organizationID: Scalars['Int']['input'];
  seekingDelegations?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateDelegationAttemptArgs = {
  delegateeId: Scalars['AccountID']['input'];
  delegatorId: Scalars['AccountID']['input'];
  governanceId: Scalars['AccountID']['input'];
  txID: Scalars['Bytes32']['input'];
};


export type MutationcreateGovernanceArgs = {
  address: Scalars['Address']['input'];
  chainId: Scalars['ChainID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['ID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  start: Scalars['Int']['input'];
  tokenId: Scalars['AssetID']['input'];
  type: GovernanceType;
};


export type MutationcreateGovernanceV2Args = {
  address: Scalars['Address']['input'];
  chainId: Scalars['ChainID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['IntID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  start: Scalars['Int']['input'];
  tokenId: Scalars['AssetID']['input'];
  type: GovernanceType;
};


export type MutationcreateGovernorOrganizationArgs = {
  input: CreateGovernorOrganizationInput;
};


export type MutationcreateGroupOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationcreateIssueArgs = {
  input: IssueInput;
};


export type MutationcreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationcreatePollArgs = {
  proposalId: Scalars['ID']['input'];
};


export type MutationcreateProposalArgs = {
  choices?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  governanceId: Scalars['AccountID']['input'];
  governorExecutableCalls: Array<GovernorExecutableCallInput>;
  originalProposalId?: InputMaybe<Scalars['ID']['input']>;
  simulationValue?: InputMaybe<Scalars['Uint256']['input']>;
  title: Scalars['String']['input'];
  txHash?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateProposalActionAttemptArgs = {
  actionType: ProposalActionType;
  actionUser: Scalars['AccountID']['input'];
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
  txID: Scalars['Bytes32']['input'];
};


export type MutationcreateProposalWithPollArgs = {
  choices?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  governanceId: Scalars['AccountID']['input'];
  title: Scalars['String']['input'];
};


export type MutationcreateProposalWithPollForGroupArgs = {
  choices?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationcreateProposalWithPollForGroupV2Args = {
  choices?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  organizationId: Scalars['IntID']['input'];
  title: Scalars['String']['input'];
};


export type MutationcreateSafeArgs = {
  id: Scalars['AccountID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['ID']['input'];
};


export type MutationcreateSafeV2Args = {
  input: CreateSafeInput;
};


export type MutationcreateTokenArgs = {
  id: Scalars['AssetID']['input'];
  start: Scalars['Int']['input'];
};


export type MutationcreateVoteAttemptArgs = {
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
  support: SupportType;
  txID: Scalars['Bytes32']['input'];
  voter: Scalars['AccountID']['input'];
};


export type MutationdeleteIssueArgs = {
  issueId: Scalars['IntID']['input'];
};


export type MutationdeleteSyncArgs = {
  accountID?: InputMaybe<Scalars['AccountID']['input']>;
};


export type MutationdisableWhitelabelDomainArgs = {
  domain: Scalars['String']['input'];
};


export type MutationjoinOrganizationArgs = {
  input: JoinOrganizationInput;
};


export type MutationlinkGovernanceArgs = {
  id: Scalars['AccountID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationlinkGovernanceV2Args = {
  id: Scalars['AccountID']['input'];
  organizationId: Scalars['IntID']['input'];
};


export type MutationloginArgs = {
  message: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};


export type MutationloginAsSafeArgs = {
  id?: InputMaybe<Scalars['AccountID']['input']>;
};


export type MutationpauseSyncArgs = {
  id: Scalars['AccountID']['input'];
};


export type MutationregisterAsContenderAttemptArgs = {
  address: Scalars['String']['input'];
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  statement?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationrestorePreviousProposalDraftArgs = {
  id: Scalars['ID']['input'];
};


export type MutationresumeSyncArgs = {
  id: Scalars['AccountID']['input'];
};


export type MutationrunProposalSimulationArgs = {
  proposalID: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['Uint256']['input']>;
};


export type MutationsetArbitrumProposalExecutedArgs = {
  input: SetArbitrumProposalExecutedInput;
};


export type MutationsyncNewContractArgs = {
  id: Scalars['AccountID']['input'];
  start: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type MutationunlinkGnosisSafeArgs = {
  id: Scalars['AccountID']['input'];
};


export type MutationunlinkGovernanceArgs = {
  id: Scalars['AccountID']['input'];
};


export type MutationupdateAccountArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  identities?: InputMaybe<IdentitiesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  picture?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateAccountByIDArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['AccountID']['input'];
  identities?: InputMaybe<IdentitiesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  picture?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateCandidateProfileArgs = {
  address: Scalars['String']['input'];
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateChainArgs = {
  blockExplorerURL?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ChainID']['input'];
  rpcURL?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateFeatureArgs = {
  accountID?: InputMaybe<Scalars['AccountID']['input']>;
  governanceID?: InputMaybe<Scalars['AccountID']['input']>;
  name: Scalars['String']['input'];
  organizationID?: InputMaybe<Scalars['ID']['input']>;
  value: Scalars['Boolean']['input'];
};


export type MutationupdateGovernanceArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  governanceId: Scalars['AccountID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationupdateOrganizationAdminsArgs = {
  input: OrganizationAdminsInput;
};


export type MutationupdateOrganizationPasswordArgs = {
  input: OrganizationPasswordInput;
};


export type MutationupdateOrganizationVotingParametersArgs = {
  input: OrganizationVotingParametersInput;
};


export type MutationupdateProposalArgs = {
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
  update: UpdateProposalInput;
};


export type MutationupdateSafeArgs = {
  id: Scalars['AccountID']['input'];
  name: Scalars['String']['input'];
};


export type MutationuploadArgs = {
  file: UploadFile;
};


export type MutationupsertDelegateProfileArgs = {
  delegateStatement: Scalars['String']['input'];
  delegateStatementSummary?: InputMaybe<Scalars['String']['input']>;
  issues?: InputMaybe<Array<Scalars['ID']['input']>>;
  organizationID: Scalars['String']['input'];
  seekingDelegations?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupsertDelegateProfileV2Args = {
  delegateStatement: Scalars['String']['input'];
  delegateStatementSummary?: InputMaybe<Scalars['String']['input']>;
  issues?: InputMaybe<Array<Scalars['ID']['input']>>;
  organizationID: Scalars['IntID']['input'];
  seekingDelegations?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationvoteArgs = {
  choice?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  pollId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  signature: Scalars['String']['input'];
  support?: InputMaybe<Scalars['String']['input']>;
};

export type NativeCurrency = {
  __typename?: 'NativeCurrency';
  /** Decimals of the Currency. e.g.: 18 */
  decimals: Scalars['Int']['output'];
  /** Name of the Currency. e.g.: Ether */
  name: Scalars['String']['output'];
  /** Symbol of the Currency. e.g.: ETH */
  symbol: Scalars['String']['output'];
};

/** Union of all node types that are paginated. */
export type Node = Delegate | DelegationV2 | GovernorV2 | Member | Organization;

export type NominationRound = Round & {
  __typename?: 'NominationRound';
  availableVotes: Scalars['Uint256']['output'];
  contenders: Array<Contender>;
  end: Block;
  endNomineeVotingPeriod: Block;
  id: Scalars['ProposalID']['output'];
  start: Block;
  status: RoundStatus;
  threshold: Scalars['Uint256']['output'];
};


export type NominationRoundavailableVotesArgs = {
  address: Scalars['String']['input'];
};


export type NominationRoundcontendersArgs = {
  filter?: InputMaybe<ContenderFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<CandidateSort>;
};

export type Nominee = Candidate & {
  __typename?: 'Nominee';
  account: Account;
  accountElectionMeta: AccountElectionMeta;
  id: Scalars['ID']['output'];
  totalVoters: Scalars['Int']['output'];
  totalVotes: Scalars['Uint256']['output'];
  votes: Array<CandidateVote>;
};


export type NomineevotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type NounsForkGovernorParameters = {
  __typename?: 'NounsForkGovernorParameters';
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars['Uint256']['output'];
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars['Uint256']['output'];
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars['Uint256']['output'];
};

export type OpenZeppelinGovernorParameters = {
  __typename?: 'OpenZeppelinGovernorParameters';
  /** The clock mode of the governor */
  clockMode?: Maybe<Scalars['String']['output']>;
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars['Uint256']['output'];
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars['Uint256']['output']>;
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars['Uint256']['output']>;
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars['Uint256']['output'];
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars['Uint256']['output'];
};

export enum OrgUxVersion {
  governor = 'governor',
  tokenless = 'tokenless'
}

export type Organization = {
  __typename?: 'Organization';
  activeProposalsCount: Scalars['Int']['output'];
  /** Can only be accessed by a TallyAdmin or Organization Admin */
  adminData?: Maybe<OrganizationAdminData>;
  chainIds: Array<Scalars['ChainID']['output']>;
  creator?: Maybe<Account>;
  features?: Maybe<Array<FeatureState>>;
  governances: Array<Governance>;
  governorIds: Array<Scalars['AccountID']['output']>;
  id: Scalars['IntID']['output'];
  metadata?: Maybe<OrganizationMetadata>;
  myRole?: Maybe<OrganizationRole>;
  name: Scalars['String']['output'];
  proposalsCount: Scalars['Int']['output'];
  requiresPasswordToJoin: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  tokenHoldersCount: Scalars['Int']['output'];
  /** Organization type, for UX purposes only. */
  uxVersion: OrgUxVersion;
  votersCount: Scalars['Int']['output'];
  /** @deprecated no longer used/supported */
  votingParameters?: Maybe<VotingParameters>;
};


export type OrganizationgovernancesArgs = {
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
  ids?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<GovernorSort>;
};

export type OrganizationAdminData = {
  __typename?: 'OrganizationAdminData';
  contact?: Maybe<Contact>;
  password?: Maybe<Scalars['String']['output']>;
};

export type OrganizationAdminsInput = {
  add?: InputMaybe<Array<AddAdminInput>>;
  id: Scalars['IntID']['input'];
  remove?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type OrganizationGovernorInput = {
  id: Scalars['AccountID']['input'];
  /** The block height at which the Governor contract was originally deployed. */
  start: Scalars['Int']['input'];
  type: GovernanceType;
};

export type OrganizationInput = {
  id?: InputMaybe<Scalars['IntID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationIssue = {
  __typename?: 'OrganizationIssue';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['IntID']['output']>;
};

export type OrganizationIssueInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
};

export type OrganizationIssuesInput = {
  filters?: InputMaybe<IssuesFiltersInput>;
};

export type OrganizationMembersFiltersInput = {
  organizationId: Scalars['IntID']['input'];
  roles?: InputMaybe<Array<OrganizationRole>>;
};

export type OrganizationMembersInput = {
  filters: OrganizationMembersFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<OrganizationMembersSortInput>;
};

export enum OrganizationMembersSortBy {
  ID = 'ID'
}

export type OrganizationMembersSortInput = {
  isDescending: Scalars['Boolean']['input'];
  sortBy: OrganizationMembersSortBy;
};

export type OrganizationMetadata = {
  __typename?: 'OrganizationMetadata';
  color?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Socials>;
};

export type OrganizationMetadataInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<ContactInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<SocialsInput>;
};

export type OrganizationPasswordInput = {
  id: Scalars['IntID']['input'];
  password: Scalars['String']['input'];
};

export enum OrganizationRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  SUPERADMIN = 'SUPERADMIN'
}

export type OrganizationTokenInput = {
  id: Scalars['AssetID']['input'];
  /** The block height at which the Token contract was originally deployed. */
  start: Scalars['Int']['input'];
};

export type OrganizationVotingParametersInput = {
  id: Scalars['IntID']['input'];
  proposalThreshold?: InputMaybe<Scalars['Uint256']['input']>;
  quorum?: InputMaybe<Scalars['Uint256']['input']>;
  role?: InputMaybe<OrganizationRole>;
  votingPeriod?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationsFiltersInput = {
  accountId?: InputMaybe<Scalars['AccountID']['input']>;
  chainId?: InputMaybe<Scalars['ChainID']['input']>;
  roles?: InputMaybe<Array<OrganizationRole>>;
};

export type OrganizationsInput = {
  filters?: InputMaybe<OrganizationsFiltersInput>;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<OrganizationsSortInput>;
};

export enum OrganizationsSortBy {
  /** Sorts organizations by live proposals and voters as on the Tally explore page. */
  EXPLORE = 'EXPLORE',
  ID = 'ID',
  NAME = 'NAME'
}

export type OrganizationsSortInput = {
  isDescending: Scalars['Boolean']['input'];
  sortBy: OrganizationsSortBy;
};

export type OtherLink = {
  __typename?: 'OtherLink';
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type OtherLinkInput = {
  label: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

/** Page metadata including pagination cursors and total count */
export type PageInfo = {
  __typename?: 'PageInfo';
  /**
   * Total number of items across all pages.
   * FYI, this is not yet implemented so the value will always be 0
   */
  count?: Maybe<Scalars['Int']['output']>;
  /** Cursor of the first item in the page */
  firstCursor?: Maybe<Scalars['String']['output']>;
  /** Cursor of the last item in the page */
  lastCursor?: Maybe<Scalars['String']['output']>;
};

/**
 * Input to specify cursor based pagination parameters.
 * Depending on which page is being fetched, between `afterCursor` & `beforeCursor`,
 * only one's value needs to be provided
 */
export type PageInput = {
  /** Cursor to start pagination after to fetch the next page */
  afterCursor?: InputMaybe<Scalars['String']['input']>;
  /** Cursor to start pagination before to fetch the previous page */
  beforeCursor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Maximum number of items per page
   * 20 is the hard limit set on the backend
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/** Wraps a list of nodes and the pagination info */
export type PaginatedOutput = {
  __typename?: 'PaginatedOutput';
  /** List of nodes for the page */
  nodes: Array<Node>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Participation = {
  __typename?: 'Participation';
  account: Account;
  /** Delegation of voting power of this `account` to another `account`.  An `account` can delegate to itself and often that is required in order for voting power to be counted. */
  delegationOut?: Maybe<Delegation>;
  /** Delegations of voting power made to this `account` */
  delegationsIn: Array<Delegation>;
  /** @deprecated use `governor` selector instead */
  governance: Governance;
  governor: Governor;
  /** Proposals created by this `account` */
  proposals: Array<Proposal>;
  /** Aggregations of account activity in this governor */
  stats: ParticipationStats;
  /** Votes made by the `account` on the `governor` */
  votes: Array<Vote>;
  /** Query voting power changes for this `account` on this `governor`.  You can request all changes or aggregate over an interval using the `interval` parameter. */
  votingPowerChanges: Array<VotingPowerChange>;
  /** @deprecated `votingPowerChanges` is a better name */
  weightChanges: Array<DelegationWeightChange>;
};


export type ParticipationdelegationsInArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type ParticipationproposalsArgs = {
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<ProposalSort>;
};


export type ParticipationvotesArgs = {
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<VoteSort>;
};


export type ParticipationvotingPowerChangesArgs = {
  earliest?: InputMaybe<Scalars['Timestamp']['input']>;
  interval?: InputMaybe<TimeInterval>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<VotingPowerChangeSort>;
};


export type ParticipationweightChangesArgs = {
  earliest?: InputMaybe<Scalars['Timestamp']['input']>;
  interval?: InputMaybe<TimeInterval>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<DelegationWeightChangeSort>;
};

export type ParticipationDelegationStats = {
  __typename?: 'ParticipationDelegationStats';
  /** Total count of delegations to this `Account` including self-delegation if present */
  total: Scalars['Int']['output'];
};

export type ParticipationProposalStats = {
  __typename?: 'ParticipationProposalStats';
  /** Number of proposals created by this `Account */
  total: Scalars['Int']['output'];
};

/** Number of votes on the last 10 proposals if there are at least ten made on this contract.  If there are not 10 proposals the amount of proposals is provided as `recentProposalCount`. */
export type ParticipationRate = {
  __typename?: 'ParticipationRate';
  /** 10 or the number of proposals on this `Governor` if less than 10 */
  recentProposalCount: Scalars['Int']['output'];
  /** Number of votes on the last 10 proposals on this `Governor` */
  recentVoteCount: Scalars['Int']['output'];
};

/** Statistics about an `Account`'s participation in a `Governor` */
export type ParticipationStats = {
  __typename?: 'ParticipationStats';
  /** Current overall number of delegations that delegate non-zero voting power */
  activeDelegationCount: Scalars['Int']['output'];
  /** Number of proposals created by this `Account */
  createdProposalsCount: Scalars['Int']['output'];
  /** Current overall number of delegations include those that delegate zero voting power */
  delegationCount: Scalars['Int']['output'];
  /** @deprecated use `delegationCount` or `activeDelegationCount` instead. */
  delegations: ParticipationDelegationStats;
  /** @deprecated use `recentParticipationRate` instead. */
  participationRate: ParticipationRate;
  /** @deprecated use `createdProposalsCount` instead. */
  proposals: ParticipationProposalStats;
  /** Number of votes on the last 10 proposals if there are at least ten made on this contract.  If there are not at least 10 proposals the amount of proposals is provided as `recentProposalCount`. */
  recentParticipationRate: ParticipationRate;
  /** Current number of tokens owned by this `Account` */
  tokenBalance: Scalars['Uint256']['output'];
  /** Number of votes made by this `Account` */
  voteCount: Scalars['Int']['output'];
  /** @deprecated use `voteCount` instead. */
  votes: ParticipationVoteStats;
  /** Current voting power information including total in & out */
  votingPower: ParticipationVotingPowerStats;
  /** @deprecated use `votingPower` instead. */
  weight: ParticipationWeightStats;
};


/** Statistics about an `Account`'s participation in a `Governor` */
export type ParticipationStatsdelegationsArgs = {
  excludeZeroWeight?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ParticipationVoteStats = {
  __typename?: 'ParticipationVoteStats';
  /** Number of votes made by this `Account` */
  total: Scalars['Int']['output'];
};

export type ParticipationVotingPowerStats = {
  __typename?: 'ParticipationVotingPowerStats';
  /** Total current voting power delegated to this `Account` including self-delegation if present */
  in: Scalars['Uint256']['output'];
  /** Total current voting power for this `Account` */
  net: Scalars['Uint256']['output'];
  /** Total voting power delegated to another `Account` */
  out: Scalars['Uint256']['output'];
};

export type ParticipationWeightStats = {
  __typename?: 'ParticipationWeightStats';
  /** Total current voting power delegated in/out of this `Account` */
  delegations: DelegationWeightStats;
  /** Current number of tokens owned by this `Account` */
  owned: Scalars['Uint256']['output'];
  /** Total current voting power for this `Account` */
  total: Scalars['Uint256']['output'];
};

export type Poll = {
  __typename?: 'Poll';
  author: Account;
  createdAt: Scalars['Timestamp']['output'];
  end: Scalars['Uint256']['output'];
  endTs: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  myVotingPower: Scalars['Uint256']['output'];
  pollVoteStats?: Maybe<Array<PollVoteStat>>;
  quorum: Scalars['Uint256']['output'];
  snapshot: Scalars['Uint256']['output'];
  start: Scalars['Uint256']['output'];
  startTs: Scalars['Timestamp']['output'];
  status: PollStatus;
  tallyProposal: TallyProposal;
  voteStats?: Maybe<Array<VoteStat>>;
  votes?: Maybe<Array<PollVote>>;
};


export type PollvotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export enum PollStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  ENDED = 'ENDED'
}

export type PollVote = {
  __typename?: 'PollVote';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  support: Scalars['String']['output'];
  voter: Account;
  weight: Scalars['Uint256']['output'];
};

export type PollVoteStat = {
  __typename?: 'PollVoteStat';
  percent: Scalars['Float']['output'];
  support: Scalars['String']['output'];
  votes: Scalars['Uint256']['output'];
  weight: Scalars['Uint256']['output'];
};

export type PriceChecker = {
  __typename?: 'PriceChecker';
  feePath: Array<Scalars['Uint256']['output']>;
  slippage: Scalars['Uint256']['output'];
  tokenPath: Array<Scalars['String']['output']>;
  /** List of Uniswap pool ids. */
  uniPoolPath?: Maybe<Array<Scalars['String']['output']>>;
};

/** Core type that describes a proposal created by an onchain Governor contract */
export type Proposal = {
  __typename?: 'Proposal';
  /**
   * `Block` at proposal creation
   * @deprecated selector `createdTransaction` contains the creation block
   */
  block: Block;
  /** `Transaction` that created this proposal */
  createdTransaction: Transaction;
  /** Proposal description onchain */
  description: Scalars['String']['output'];
  /** Last block when you can cast a vote */
  end: Block;
  /** Time at which a proposal can be executed */
  eta?: Maybe<Scalars['Uint256']['output']>;
  /** Payload that can be executed after the proposal passes */
  executable: Executable;
  /**
   * Governor contract details
   * @deprecated selector `Governor` returns the new type
   */
  governance: Governance;
  /**
   * Governor contract `AccountID`
   * @deprecated selector `Governor` contains governor contract `id`
   */
  governanceId: Scalars['AccountID']['output'];
  /** Governor contract details */
  governor: Governor;
  /**
   * Hash of `Transaction` that created this proposal
   * @deprecated selector `createdTransaction` contains the creation transaction hash
   */
  hash: Scalars['String']['output'];
  /** Chain Scoped onchain Proposal ID */
  id: Scalars['ID']['output'];
  /** `Account` that created this proposal */
  proposer: Account;
  /** First block when you can cast a vote, also the time when quorum is established */
  start: Block;
  /** List of state transitions for this proposal.  The last `StatusChange` is the current state. */
  statusChanges?: Maybe<Array<StatusChange>>;
  /** Tally draft if exists */
  tallyProposal?: Maybe<TallyProposal>;
  /** Proposal title: usually first line of description */
  title: Scalars['String']['output'];
  /** Summary of voting by vote choice */
  voteStats?: Maybe<Array<VoteStat>>;
  /** List of votes on this proposal */
  votes?: Maybe<Array<Vote>>;
  /** Voting power of a given address on this proposal */
  votingPower: Scalars['Uint256']['output'];
};


/** Core type that describes a proposal created by an onchain Governor contract */
export type ProposalvotesArgs = {
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<VoteSort>;
  voters?: InputMaybe<Array<Scalars['Address']['input']>>;
};


/** Core type that describes a proposal created by an onchain Governor contract */
export type ProposalvotingPowerArgs = {
  id: Scalars['AccountID']['input'];
};

/** The `ProposalActionAttempt` type represents the stored attempt of a user attempting an action on a `Proposal`. */
export type ProposalActionAttempt = {
  __typename?: 'ProposalActionAttempt';
  actionType: ProposalActionType;
  actionUser: Account;
  createdAt: Scalars['Timestamp']['output'];
  proposal: Proposal;
  txID: Scalars['HashID']['output'];
};

export type ProposalActionSecurityCheckInput = {
  executableCall: GovernorExecutableCallInput;
  governorId: Scalars['AccountID']['input'];
  value?: InputMaybe<Scalars['Uint256']['input']>;
};

/** The `ProposalActionType` type represents the attempted action on a `Proposal` as part of a `ProposalActionAttempt`. */
export enum ProposalActionType {
  CANCEL = 'CANCEL',
  EXECUTE = 'EXECUTE',
  QUEUE = 'QUEUE'
}

export type ProposalSort = {
  field?: InputMaybe<ProposalSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum ProposalSortField {
  CREATED_AT = 'CREATED_AT',
  END_BLOCK = 'END_BLOCK',
  EXECUTION_ETA = 'EXECUTION_ETA',
  START_BLOCK = 'START_BLOCK'
}

export type ProposalStats = {
  __typename?: 'ProposalStats';
  /** Total count of active proposals */
  active: Scalars['Int']['output'];
  /** Total count of failed proposals including quorum not reached */
  failed: Scalars['Int']['output'];
  /** Total count of passed proposals */
  passed: Scalars['Int']['output'];
  /** Total count of proposals */
  total: Scalars['Int']['output'];
};

export enum ProposalStatusType {
  /** Voting is in progress. */
  ACTIVE = 'ACTIVE',
  /** Proposal has been canceled.  This is a final status. */
  CANCELED = 'CANCELED',
  /** Proposal has been defeated.  This proposal cannot be queued or excuted.  This is a final status. */
  DEFEATED = 'DEFEATED',
  /** Proposal has been executed.  This is a final status. */
  EXECUTED = 'EXECUTED',
  /** Proposal has expired.  This is a final status. */
  EXPIRED = 'EXPIRED',
  /** Proposal has been created, but voting has not started.  An address can still accumulate voting power. */
  PENDING = 'PENDING',
  /** Proposal has queued into a timelock.  This proposal can be excuted. */
  QUEUED = 'QUEUED',
  /** Proposal has succeeded, it can now be queued or executed. */
  SUCCEEDED = 'SUCCEEDED'
}

export type Query = {
  __typename?: 'Query';
  /** Returns `Account` given a chain scoped `AccountID`. */
  account: Account;
  /** Returns `Account` by given an ENS name. */
  accountByEns: Account;
  /** @deprecated Use `delegators` instead. */
  accountDelegationsIn?: Maybe<Array<Delegation>>;
  accountV2: Account;
  accounts: Array<Account>;
  address: AddressInfo;
  /** Returns tokens that can be swapped from the governor's treasury via the Tally Swap proposal recipe. */
  availableSwaps: SwapAssets;
  /** Returns the `Block` including an actual or estimated timestamp given a `BlockID`. */
  block: Block;
  candidateEmails: Array<CandidateExport>;
  chains: Array<Maybe<Chain>>;
  claimAndDelegateAttempt?: Maybe<ClaimAndDelegateAttempt>;
  contender: Contender;
  council: Council;
  councilSlugToId: Scalars['AccountID']['output'];
  councils: Array<Council>;
  createProposalActionSecurityCheck: Array<SecurityCheck>;
  createProposalSimulation: Array<Simulation>;
  delegate?: Maybe<Delegate>;
  /** @deprecated Use `delegate.statement` instead. */
  delegateStatement?: Maybe<DelegateStatement>;
  delegatee?: Maybe<DelegationV2>;
  delegatees: PaginatedOutput;
  /** Returns a paginated list of delegates that match the provided filters. */
  delegates: PaginatedOutput;
  delegationAttempt?: Maybe<DelegationAttempt>;
  delegators: PaginatedOutput;
  election: Election;
  generateAdminToolToken: Scalars['String']['output'];
  /** Returns any `GnosisSafe`'s info given a chain scoped `AccountID`. */
  gnosisSafe: GnosisSafe;
  gnosisSafeTransaction: GnosisSafeTransaction;
  /** Returns a list of multisig tranasctions given a safe `AccountID`.  `Pagniation` defaults to a limit of 20 transactions if no limit is provided.  There are a number of filters and ordering settings we can support, please reach out to discuss. */
  gnosisSafeTransactions: Array<GnosisSafeTransaction>;
  /** This will return a list of `GnosisSafe`s related to a DAO along with `GnosisSafe` info similar to the governances query. */
  gnosisSafes: Array<GnosisSafe>;
  gnosisSafesV2: Array<GnosisSafe>;
  governance: Governance;
  governanceBySlug: Governance;
  governanceSyncs?: Maybe<Array<GovernanceSync>>;
  governanceTypes?: Maybe<Array<GovernanceTypeData>>;
  governances: Array<Governance>;
  governancesV2: Array<Governance>;
  governor: GovernorV2;
  /** Returns a list of governors that match the provided filters.  Note: Tally may deactivate governors from time to time.  If you wish to include those set `includeInactive` to `true`. */
  governors: Array<Governor>;
  governorsV2: PaginatedOutput;
  issues?: Maybe<Array<Maybe<Issue>>>;
  me: Account;
  memberRound: MemberRound;
  metaTransactions?: Maybe<Array<MetaTransaction>>;
  nominationRound: NominationRound;
  nominee: Nominee;
  organization: Organization;
  organizationMembers: PaginatedOutput;
  organizationSlugToId: Scalars['IntID']['output'];
  organizations: PaginatedOutput;
  poll: Poll;
  polls: Array<Poll>;
  pollsV2: Array<Poll>;
  proposal: Proposal;
  proposalActionAttempt: ProposalActionAttempt;
  proposals: Array<Proposal>;
  /** Returns a quote for a swap. */
  quoteSwap: SwapQuote;
  searchOrganization: Array<Organization>;
  securityChecks: Array<SecurityCheck>;
  tallyProposal: TallyProposal;
  tallyProposalWithVersions: Array<TallyProposal>;
  tallyProposals: Array<TallyProposal>;
  tallyProposalsV2: Array<TallyProposal>;
  tokenBalance: TokenBalance;
  tokenSyncs?: Maybe<Array<TokenSync>>;
  /** Fetches the last vote attempt from a given user on a proposal. */
  voteAttempt?: Maybe<VoteAttempt>;
  whitelabelDomains?: Maybe<Array<Scalars['String']['output']>>;
};


export type QueryaccountArgs = {
  id: Scalars['AccountID']['input'];
};


export type QueryaccountByEnsArgs = {
  ens: Scalars['String']['input'];
};


export type QueryaccountDelegationsInArgs = {
  accountID: Scalars['AccountID']['input'];
  governanceId: Scalars['AccountID']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryaccountV2Args = {
  id: Scalars['Address']['input'];
};


export type QueryaccountsArgs = {
  addresses?: InputMaybe<Array<Scalars['Address']['input']>>;
  ids?: InputMaybe<Array<Scalars['AccountID']['input']>>;
};


export type QueryaddressArgs = {
  address: Scalars['Address']['input'];
};


export type QueryavailableSwapsArgs = {
  governorID: Scalars['AccountID']['input'];
};


export type QueryblockArgs = {
  id: BlockIDInput;
};


export type QuerycandidateEmailsArgs = {
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
};


export type QueryclaimAndDelegateAttemptArgs = {
  delegatorId: Scalars['AccountID']['input'];
  tokenId: Scalars['AssetID']['input'];
};


export type QuerycontenderArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
  ens?: InputMaybe<Scalars['String']['input']>;
};


export type QuerycouncilArgs = {
  slug: Scalars['String']['input'];
};


export type QuerycouncilSlugToIdArgs = {
  slug: Scalars['String']['input'];
};


export type QuerycouncilsArgs = {
  tokenId: Scalars['AssetID']['input'];
};


export type QuerycreateProposalActionSecurityCheckArgs = {
  input: ProposalActionSecurityCheckInput;
};


export type QuerycreateProposalSimulationArgs = {
  executableCalls: Array<GovernorExecutableCallInput>;
  governanceID: Scalars['AccountID']['input'];
  value?: InputMaybe<Scalars['Uint256']['input']>;
};


export type QuerydelegateArgs = {
  input: DelegateInput;
};


export type QuerydelegateStatementArgs = {
  address: Scalars['Address']['input'];
  governanceId: Scalars['AccountID']['input'];
};


export type QuerydelegateeArgs = {
  input: DelegationInput;
};


export type QuerydelegateesArgs = {
  input: DelegationsInput;
};


export type QuerydelegatesArgs = {
  input: DelegatesInput;
};


export type QuerydelegationAttemptArgs = {
  delegatorId: Scalars['AccountID']['input'];
  governanceId: Scalars['AccountID']['input'];
};


export type QuerydelegatorsArgs = {
  input: DelegationsInput;
};


export type QueryelectionArgs = {
  councilSlug: Scalars['String']['input'];
  number: Scalars['Int']['input'];
};


export type QuerygnosisSafeArgs = {
  id: Scalars['AccountID']['input'];
};


export type QuerygnosisSafeTransactionArgs = {
  safeTxHashID: Scalars['HashID']['input'];
};


export type QuerygnosisSafeTransactionsArgs = {
  gnosisSafeId: Scalars['AccountID']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QuerygnosisSafesArgs = {
  organizationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerygnosisSafesV2Args = {
  input?: InputMaybe<GnosisSafesInput>;
};


export type QuerygovernanceArgs = {
  id: Scalars['AccountID']['input'];
};


export type QuerygovernanceBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QuerygovernanceSyncsArgs = {
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
};


export type QuerygovernancesArgs = {
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
  ids?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnlinked?: InputMaybe<Scalars['Boolean']['input']>;
  organizationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<GovernorSort>;
};


export type QuerygovernancesV2Args = {
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
  ids?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnlinked?: InputMaybe<Scalars['Boolean']['input']>;
  organizationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<GovernorSort>;
};


export type QuerygovernorArgs = {
  input: GovernorInput;
};


export type QuerygovernorsArgs = {
  addresses?: InputMaybe<Array<Scalars['Address']['input']>>;
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
  ids?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnlinked?: InputMaybe<Scalars['Boolean']['input']>;
  organizationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<GovernorSort>;
};


export type QuerygovernorsV2Args = {
  input: GovernorsInput;
};


export type QueryissuesArgs = {
  input?: InputMaybe<IssuesInput>;
};


export type QuerymemberRoundArgs = {
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
};


export type QuerymetaTransactionsArgs = {
  action: MetaTransactionAction;
  address?: InputMaybe<Scalars['Address']['input']>;
  governorId?: InputMaybe<Scalars['AccountID']['input']>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<MetaTransactionSort>;
};


export type QuerynominationRoundArgs = {
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
};


export type QuerynomineeArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  councilSlug: Scalars['String']['input'];
  electionNumber: Scalars['Int']['input'];
  ens?: InputMaybe<Scalars['String']['input']>;
};


export type QueryorganizationArgs = {
  input: OrganizationInput;
};


export type QueryorganizationMembersArgs = {
  input: OrganizationMembersInput;
};


export type QueryorganizationSlugToIdArgs = {
  slug: Scalars['String']['input'];
};


export type QueryorganizationsArgs = {
  input?: InputMaybe<OrganizationsInput>;
};


export type QuerypollArgs = {
  id: Scalars['ID']['input'];
};


export type QuerypollsArgs = {
  governanceId?: InputMaybe<Scalars['AccountID']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
};


export type QuerypollsV2Args = {
  governanceId?: InputMaybe<Scalars['AccountID']['input']>;
  organizationId?: InputMaybe<Scalars['IntID']['input']>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryproposalArgs = {
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
};


export type QueryproposalActionAttemptArgs = {
  actionType: ProposalActionType;
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
};


export type QueryproposalsArgs = {
  chainId: Scalars['ChainID']['input'];
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  governors?: InputMaybe<Array<Scalars['Address']['input']>>;
  pagination?: InputMaybe<Pagination>;
  proposalIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  proposerIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  proposers?: InputMaybe<Array<Scalars['Address']['input']>>;
  sort?: InputMaybe<ProposalSort>;
};


export type QueryquoteSwapArgs = {
  buy: Scalars['AccountID']['input'];
  governorID: Scalars['AccountID']['input'];
  sell: Scalars['AccountID']['input'];
  sellAmount: Scalars['Uint256']['input'];
};


export type QuerysearchOrganizationArgs = {
  input: SearchOrganizationInput;
};


export type QuerysecurityChecksArgs = {
  proposalId: Scalars['ID']['input'];
};


export type QuerytallyProposalArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  latest?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerytallyProposalWithVersionsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  originalProposalId: Scalars['ID']['input'];
};


export type QuerytallyProposalsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  creatorIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organizationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<TallyProposalSort>;
};


export type QuerytallyProposalsV2Args = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  creatorIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  governanceIds?: InputMaybe<Array<Scalars['AccountID']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organizationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<TallyProposalSort>;
};


export type QuerytokenBalanceArgs = {
  input: TokenBalanceInput;
};


export type QuerytokenSyncsArgs = {
  chainIds?: InputMaybe<Array<Scalars['ChainID']['input']>>;
};


export type QueryvoteAttemptArgs = {
  governanceId: Scalars['AccountID']['input'];
  proposalId: Scalars['ID']['input'];
  voter: Scalars['AccountID']['input'];
};

export type RecentParticipationStatsInput = {
  governorID: Scalars['AccountID']['input'];
};

export enum Recipe {
  custom = 'custom',
  empty = 'empty',
  erc20_transfer = 'erc20_transfer',
  erc20_transfer_arbitrum = 'erc20_transfer_arbitrum',
  nativeAsset_transfer = 'nativeAsset_transfer',
  orca_manage_pod = 'orca_manage_pod',
  reward = 'reward',
  swap = 'swap'
}

export type RewardsMeta = {
  __typename?: 'RewardsMeta';
  contributorFee: Scalars['Int']['output'];
  recipients: Array<Scalars['String']['output']>;
  tallyFee: Scalars['Int']['output'];
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type Round = {
  availableVotes: Scalars['Uint256']['output'];
  end: Block;
  id: Scalars['ProposalID']['output'];
  start: Block;
  status: RoundStatus;
};


export type RoundavailableVotesArgs = {
  address: Scalars['String']['input'];
};

export enum RoundStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  EXECUTED = 'EXECUTED',
  PENDING = 'PENDING'
}

export type SafeTokenBalance = {
  __typename?: 'SafeTokenBalance';
  address?: Maybe<Scalars['String']['output']>;
  amount: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  fiat: Scalars['String']['output'];
  logoURI: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type SearchOrganizationFiltersInput = {
  chainId?: InputMaybe<Scalars['ChainID']['input']>;
};

export type SearchOrganizationInput = {
  filters?: InputMaybe<SearchOrganizationFiltersInput>;
  name: Scalars['String']['input'];
};

export type SecurityAnalysis = {
  __typename?: 'SecurityAnalysis';
  dataPoints: Array<AnalysisDataPoint>;
};

/** Type that describes a security check related to a proposal */
export type SecurityCheck = {
  __typename?: 'SecurityCheck';
  createdAt: Scalars['Timestamp']['output'];
  /** JSON metadata of the security check */
  metadata: SecurityCheckMetadata;
};

/** Union that describes the metadata of a security check */
export type SecurityCheckMetadata = ContractVerification | SecurityAnalysis | TransactionSimulation;

export type SetArbitrumProposalExecutedInput = {
  /** eip155:42161:blockNumber */
  blockId: Scalars['BlockID']['input'];
  /** eip155:42161:proposalId */
  proposalId: Scalars['ProposalID']['input'];
  /** eip155:42161:transactionHash */
  transactionHash: Scalars['HashID']['input'];
};

export type Simulation = {
  __typename?: 'Simulation';
  executionValue: Scalars['Uint256']['output'];
  id: Scalars['ID']['output'];
  raw: Scalars['String']['output'];
  status: SimulationStatus;
};

export enum SimulationStatus {
  failed = 'failed',
  success = 'success'
}

export type Socials = {
  __typename?: 'Socials';
  discord?: Maybe<Scalars['String']['output']>;
  others?: Maybe<Array<Maybe<OtherLink>>>;
  telegram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type SocialsInput = {
  discord?: InputMaybe<Scalars['String']['input']>;
  others?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export enum SortDelegates {
  RANDOM = 'RANDOM',
  VOTES = 'VOTES'
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type SpectaQLOption = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type StatusChange = {
  __typename?: 'StatusChange';
  /** Transaction hash of this state transition if applicable.  Computed states do not have an associated transaction. */
  block: Block;
  /**
   * Block Number of this state transition
   * @deprecated selector `block` contains the block number
   */
  blockNumber: Scalars['Int']['output'];
  /**
   * Timestamp of this state transition
   * @deprecated selector `block` contains the block timestamp
   */
  blockTimestamp: Scalars['Timestamp']['output'];
  transaction?: Maybe<Transaction>;
  txHash?: Maybe<Scalars['String']['output']>;
  /** Proposal State */
  type: ProposalStatusType;
};

/** Vote Choice */
export enum SupportType {
  ABSTAIN = 'ABSTAIN',
  AGAINST = 'AGAINST',
  FOR = 'FOR'
}

export type SwapAssets = {
  __typename?: 'SwapAssets';
  /** List of tokens that can be bought via the Tally Swap proposal recipe. */
  buy: Array<SwapToken>;
  /** List of tokens that can be sold via the Tally Swap proposal recipe. */
  sell: Array<BalanceItem>;
};

export type SwapMetaInput = {
  __typename?: 'SwapMetaInput';
  /** Tally fee */
  fee?: Maybe<Scalars['Uint256']['output']>;
  /** List of Uniswap pool ids, describing price checker path. */
  uniPoolPath?: Maybe<Array<Scalars['String']['output']>>;
};

export type SwapOrder = {
  __typename?: 'SwapOrder';
  /** Address of the order smart contract. */
  address?: Maybe<Scalars['String']['output']>;
  /** Buy amount if status is fulfilled. */
  buyAmount?: Maybe<Scalars['Uint256']['output']>;
  /** CoW order id if status is fulfilled. */
  id?: Maybe<Scalars['String']['output']>;
  /** Status of the order. */
  status: SwapOrderStatus;
};

export enum SwapOrderStatus {
  FAILED = 'FAILED',
  FULFILLED = 'FULFILLED',
  PENDING = 'PENDING',
  PENDING_EXECUTION = 'PENDING_EXECUTION'
}

export type SwapQuote = {
  __typename?: 'SwapQuote';
  buyAmount: Scalars['Uint256']['output'];
  buyTokenQuoteRate?: Maybe<Scalars['Float']['output']>;
  feeAmount: Scalars['Uint256']['output'];
  sellAmount: Scalars['Uint256']['output'];
  validTo: Scalars['Timestamp']['output'];
};

export type SwapRecipeMeta = {
  __typename?: 'SwapRecipeMeta';
  /** Sell amount for the swap. */
  amountIn: Scalars['Uint256']['output'];
  buyToken: TokenData;
  /** Tally fee */
  fee?: Maybe<Scalars['Uint256']['output']>;
  /** Order if the proposal is executed. */
  order?: Maybe<SwapOrder>;
  priceChecker: PriceChecker;
  /** Quote if no order exists yet. */
  quote?: Maybe<SwapQuote>;
  sellToken: TokenData;
  to: Scalars['AccountID']['output'];
};

export type SwapToken = {
  __typename?: 'SwapToken';
  decimals: Scalars['Int']['output'];
  id: Scalars['AccountID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type TallyProposal = {
  __typename?: 'TallyProposal';
  choices?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['Timestamp']['output'];
  creator: Account;
  description: Scalars['String']['output'];
  executableCalls?: Maybe<Array<ExecutableCall>>;
  governance?: Maybe<Governance>;
  governorProposal?: Maybe<Proposal>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isArchived: Scalars['Boolean']['output'];
  onChainId?: Maybe<Scalars['ID']['output']>;
  organization?: Maybe<Organization>;
  originalProposalId?: Maybe<Scalars['ID']['output']>;
  poll?: Maybe<Poll>;
  status: TallyProposalStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type TallyProposalSort = {
  field?: InputMaybe<TallyProposalSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum TallyProposalSortField {
  CREATED_AT = 'CREATED_AT'
}

export enum TallyProposalStatus {
  CONFIRMED = 'CONFIRMED',
  DRAFT = 'DRAFT',
  FAILED = 'FAILED',
  SUBMITTED = 'SUBMITTED'
}

export enum TimeInterval {
  ALL = 'ALL',
  DAY = 'DAY',
  HOUR = 'HOUR',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  WEEK = 'WEEK',
  YEAR = 'YEAR'
}

/** Core type that describes an onchain Token contract */
export type Token = {
  __typename?: 'Token';
  /**
   * EVM Address on chain.  See `id` for chain id
   * @deprecated selector `id` has more context
   */
  address: Scalars['Address']['output'];
  /** Number of decimal places included in `Uint256` values */
  decimals: Scalars['Int']['output'];
  /** Eligibility of an account to claim this token */
  eligibility: Eligibility;
  id: Scalars['AssetID']['output'];
  isIndexing: Scalars['Boolean']['output'];
  /**
   * Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged.
   * @deprecated new selector `lastIndexedBlock` has more context
   */
  lastBlock: Scalars['Int']['output'];
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block;
  /** Onchain name */
  name: Scalars['String']['output'];
  /** Counts of owners, voters as well as total supply and delegated voting power. */
  stats: GovernorTokenStats;
  /** supply derived from `Transfer` events */
  supply: Scalars['Uint256']['output'];
  /** Onchain symbol */
  symbol: Scalars['String']['output'];
  /** Token contract type */
  type: TokenType;
};


/** Core type that describes an onchain Token contract */
export type TokeneligibilityArgs = {
  id: Scalars['AccountID']['input'];
};

export type TokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['Uint256']['output'];
  token: Token;
};

export type TokenBalanceInput = {
  address: Scalars['Address']['input'];
  governorID: Scalars['AccountID']['input'];
};

export type TokenContract = {
  __typename?: 'TokenContract';
  address: Scalars['Address']['output'];
  lastBlock: Scalars['Int']['output'];
  type: TokenType;
};

export type TokenData = {
  __typename?: 'TokenData';
  data: CovalentData;
  id: Scalars['AccountID']['output'];
};

export type TokenDelegateStats = {
  __typename?: 'TokenDelegateStats';
  /** Total count of delegates by token */
  total: Scalars['Int']['output'];
};

export type TokenSync = {
  __typename?: 'TokenSync';
  id: Scalars['AssetID']['output'];
  start: Scalars['Int']['output'];
};

export enum TokenType {
  ERC20 = 'ERC20',
  ERC20AAVE = 'ERC20AAVE',
  ERC721 = 'ERC721'
}

export type Transaction = {
  __typename?: 'Transaction';
  block: Block;
  id: Scalars['HashID']['output'];
};

export type TransactionSimulation = {
  __typename?: 'TransactionSimulation';
  publicURI: Scalars['String']['output'];
  result: Scalars['String']['output'];
};

export type Treasury = {
  __typename?: 'Treasury';
  tokens: Array<SafeTokenBalance>;
  totalUSDValue: Scalars['String']['output'];
};

export type TwitterIdentity = {
  nonce: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type UpdateOrganizationInput = {
  id: Scalars['IntID']['input'];
  metadata?: InputMaybe<OrganizationMetadataInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProposalInput = {
  status?: InputMaybe<TallyProposalStatus>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

/** The `UploadFile` type, represents the request for uploading a file with a certain payload. */
export type UploadFile = {
  id: Scalars['Int']['input'];
  upload: Scalars['Upload']['input'];
};

/** Votes cast in a Governor proposal */
export type Vote = {
  __typename?: 'Vote';
  /**
   * `Block` vote was cast in.
   * @deprecated selector `transaction` contains the creation block
   */
  block: Block;
  /**
   * Hash of Transaction in which the vote cast.
   * @deprecated selector `transaction` contains the creation transaction hash
   */
  hash: Scalars['Bytes32']['output'];
  /** Proposal and voter concatenated id. */
  id: Scalars['ID']['output'];
  /** Proposal on which vote was cast. */
  proposal: Proposal;
  /** Optional reason for vote choice provided by the voter. */
  reason?: Maybe<Scalars['String']['output']>;
  /** Vote choice made by voter. */
  support: SupportType;
  /** `Transaction` vote was cast in. */
  transaction: Transaction;
  /** Voter that cast the vote. */
  voter: Account;
  /** Weight of the vote.  Typically total delegated voting power of voter at proposal voting `start` block. */
  weight: Scalars['Uint256']['output'];
};

/** The `VoteAttempt` type represents the stored attempt of a user that tried voting on a given proposal. */
export type VoteAttempt = {
  __typename?: 'VoteAttempt';
  createdAt: Scalars['Timestamp']['output'];
  proposal: Proposal;
  support: SupportType;
  txID: Scalars['HashID']['output'];
  voter: Account;
};

export type VoteSort = {
  field?: InputMaybe<VoteSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum VoteSortField {
  BLOCK = 'BLOCK',
  CREATED = 'CREATED',
  WEIGHT = 'WEIGHT'
}

/** Voting Summary per Choice */
export type VoteStat = {
  __typename?: 'VoteStat';
  /** Percent of total weight cast in this `Proposal` */
  percent: Scalars['Float']['output'];
  /** Vote Choice */
  support: SupportType;
  /** Number of distinct votes cast for this Choice/`SupportType` */
  votes: Scalars['Uint256']['output'];
  /** Total weight (voting power) for this Choice/`SupportType` */
  weight: Scalars['Uint256']['output'];
};

export type VotingParameters = {
  __typename?: 'VotingParameters';
  proposalThreshold?: Maybe<Scalars['Uint256']['output']>;
  quorum?: Maybe<Scalars['Uint256']['output']>;
  /** Role user needs to have to update the voting parameters. */
  requiredRole: OrganizationRole;
  /** Voting period defined in s, defaults to 172800 (2 days). */
  votingPeriod: Scalars['Int']['output'];
};

/** Represents a voting power change over an interval or triggered by an event. */
export type VotingPowerChange = {
  __typename?: 'VotingPowerChange';
  /** The `delegate` address whose voting power is changing */
  delegate: Account;
  /** Net change in voting power caused by this event */
  netChange: Scalars['Uint256']['output'];
  /** Voting power after this event or interval */
  newBalance: Scalars['Uint256']['output'];
  /** Voting power prior to this event or interval */
  prevBalance: Scalars['Uint256']['output'];
  /** Timestamp of event or beginging of the interval this voting power change represents */
  timestamp: Scalars['Timestamp']['output'];
  token: Token;
  /** Transaction that triggered this voting change, unset if this is an interval */
  transaction?: Maybe<Transaction>;
};

export type VotingPowerChangeSort = {
  field?: InputMaybe<VotingPowerChangeSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum VotingPowerChangeSortField {
  CREATED = 'CREATED',
  NET_CHANGE = 'NET_CHANGE',
  NEW_BALANCE = 'NEW_BALANCE',
  OLD_BALANCE = 'OLD_BALANCE'
}

export type DelegatesQueryVariables = Exact<{
  input: DelegatesInput;
}>;


export type DelegatesQuery = { __typename?: 'Query', delegates: { __typename?: 'PaginatedOutput', nodes: Array<{ __typename?: 'Delegate', votesCount: any, account: { __typename?: 'Account', address: any, name: string, ens?: string | null } } | { __typename?: 'DelegationV2' } | { __typename?: 'GovernorV2' } | { __typename?: 'Member' } | { __typename?: 'Organization' }>, pageInfo: { __typename?: 'PageInfo', firstCursor?: string | null, lastCursor?: string | null } } };


export const DelegatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Delegates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DelegatesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delegates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ens"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votesCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstCursor"}},{"kind":"Field","name":{"kind":"Name","value":"lastCursor"}}]}}]}}]}}]} as unknown as DocumentNode<DelegatesQuery, DelegatesQueryVariables>;