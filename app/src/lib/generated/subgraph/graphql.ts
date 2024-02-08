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
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  beneficiaryships: Array<Deposit>;
  claimedRewards: Scalars['BigInt']['output'];
  createdAt: Scalars['Int']['output'];
  currentlyStaked: Scalars['BigInt']['output'];
  delegateeSurrogates: Array<Surrogate>;
  delegateeships: Array<Deposit>;
  events: Array<AccountEvent>;
  id: Scalars['Bytes']['output'];
  ownerships: Array<Deposit>;
  totalStaked: Scalars['BigInt']['output'];
  totalWithdrawn: Scalars['BigInt']['output'];
};


export type AccountbeneficiaryshipsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Deposit_filter>;
};


export type AccountdelegateeSurrogatesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Surrogate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Surrogate_filter>;
};


export type AccountdelegateeshipsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Deposit_filter>;
};


export type AccounteventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountEvent_filter>;
};


export type AccountownershipsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Deposit_filter>;
};

export type AccountEvent = {
  __typename?: 'AccountEvent';
  account: Account;
  deposit?: Maybe<Deposit>;
  event: Event;
  id: Scalars['String']['output'];
};

export type AccountEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<AccountEvent_filter>>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_?: InputMaybe<Event_filter>;
  event_contains?: InputMaybe<Scalars['String']['input']>;
  event_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_gt?: InputMaybe<Scalars['String']['input']>;
  event_gte?: InputMaybe<Scalars['String']['input']>;
  event_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_lt?: InputMaybe<Scalars['String']['input']>;
  event_lte?: InputMaybe<Scalars['String']['input']>;
  event_not?: InputMaybe<Scalars['String']['input']>;
  event_not_contains?: InputMaybe<Scalars['String']['input']>;
  event_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<AccountEvent_filter>>>;
};

export enum AccountEvent_orderBy {
  account = 'account',
  account__claimedRewards = 'account__claimedRewards',
  account__createdAt = 'account__createdAt',
  account__currentlyStaked = 'account__currentlyStaked',
  account__id = 'account__id',
  account__totalStaked = 'account__totalStaked',
  account__totalWithdrawn = 'account__totalWithdrawn',
  deposit = 'deposit',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  event = 'event',
  event__blockNumber = 'event__blockNumber',
  event__blockTimestamp = 'event__blockTimestamp',
  event__id = 'event__id',
  event__transactionHash = 'event__transactionHash',
  event__type = 'event__type',
  id = 'id'
}

export type Account_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  beneficiaryships_?: InputMaybe<Deposit_filter>;
  claimedRewards?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentlyStaked?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentlyStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegateeSurrogates_?: InputMaybe<Surrogate_filter>;
  delegateeships_?: InputMaybe<Deposit_filter>;
  events_?: InputMaybe<AccountEvent_filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  ownerships_?: InputMaybe<Deposit_filter>;
  totalStaked?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawn?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Account_orderBy {
  beneficiaryships = 'beneficiaryships',
  claimedRewards = 'claimedRewards',
  createdAt = 'createdAt',
  currentlyStaked = 'currentlyStaked',
  delegateeSurrogates = 'delegateeSurrogates',
  delegateeships = 'delegateeships',
  events = 'events',
  id = 'id',
  ownerships = 'ownerships',
  totalStaked = 'totalStaked',
  totalWithdrawn = 'totalWithdrawn'
}

export type AdminSet = {
  __typename?: 'AdminSet';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newAdmin: Scalars['Bytes']['output'];
  oldAdmin: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AdminSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdminSet_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AdminSet_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum AdminSet_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  id = 'id',
  newAdmin = 'newAdmin',
  oldAdmin = 'oldAdmin',
  transactionHash = 'transactionHash'
}

export type BeneficiaryAltered = DepositEvent & Event & {
  __typename?: 'BeneficiaryAltered';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deposit: Deposit;
  depositId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newBeneficiary: Scalars['Bytes']['output'];
  oldBeneficiary: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type BeneficiaryAltered_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BeneficiaryAltered_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newBeneficiary?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newBeneficiary_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_not?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newBeneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldBeneficiary?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_gt?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_gte?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldBeneficiary_lt?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_lte?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_not?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldBeneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BeneficiaryAltered_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum BeneficiaryAltered_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  deposit = 'deposit',
  depositId = 'depositId',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  id = 'id',
  newBeneficiary = 'newBeneficiary',
  oldBeneficiary = 'oldBeneficiary',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type DelegateeAltered = DepositEvent & Event & {
  __typename?: 'DelegateeAltered';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deposit: Deposit;
  depositId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newDelegatee: Scalars['Bytes']['output'];
  oldDelegatee: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type DelegateeAltered_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegateeAltered_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newDelegatee?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newDelegatee_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_not?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newDelegatee_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldDelegatee?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_gt?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_gte?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  oldDelegatee_lt?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_lte?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_not?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  oldDelegatee_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DelegateeAltered_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum DelegateeAltered_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  deposit = 'deposit',
  depositId = 'depositId',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  id = 'id',
  newDelegatee = 'newDelegatee',
  oldDelegatee = 'oldDelegatee',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type Deposit = {
  __typename?: 'Deposit';
  amount: Scalars['BigInt']['output'];
  beneficiary: Account;
  createdAt: Scalars['Int']['output'];
  delegatee: Account;
  events: Array<DepositEvent>;
  id: Scalars['String']['output'];
  owner: Account;
  updatedAt: Scalars['Int']['output'];
};


export type DepositeventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepositEvent_filter>;
};

export type DepositEvent = {
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deposit: Deposit;
  depositId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type DepositEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum DepositEvent_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  deposit = 'deposit',
  depositId = 'depositId',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  id = 'id',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type Deposit_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
  beneficiary?: InputMaybe<Scalars['String']['input']>;
  beneficiary_?: InputMaybe<Account_filter>;
  beneficiary_contains?: InputMaybe<Scalars['String']['input']>;
  beneficiary_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  beneficiary_ends_with?: InputMaybe<Scalars['String']['input']>;
  beneficiary_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  beneficiary_gt?: InputMaybe<Scalars['String']['input']>;
  beneficiary_gte?: InputMaybe<Scalars['String']['input']>;
  beneficiary_in?: InputMaybe<Array<Scalars['String']['input']>>;
  beneficiary_lt?: InputMaybe<Scalars['String']['input']>;
  beneficiary_lte?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_contains?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  beneficiary_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  beneficiary_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  beneficiary_starts_with?: InputMaybe<Scalars['String']['input']>;
  beneficiary_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatee?: InputMaybe<Scalars['String']['input']>;
  delegatee_?: InputMaybe<Account_filter>;
  delegatee_contains?: InputMaybe<Scalars['String']['input']>;
  delegatee_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_gt?: InputMaybe<Scalars['String']['input']>;
  delegatee_gte?: InputMaybe<Scalars['String']['input']>;
  delegatee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_lt?: InputMaybe<Scalars['String']['input']>;
  delegatee_lte?: InputMaybe<Scalars['String']['input']>;
  delegatee_not?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  events_?: InputMaybe<DepositEvent_filter>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum Deposit_orderBy {
  amount = 'amount',
  beneficiary = 'beneficiary',
  beneficiary__claimedRewards = 'beneficiary__claimedRewards',
  beneficiary__createdAt = 'beneficiary__createdAt',
  beneficiary__currentlyStaked = 'beneficiary__currentlyStaked',
  beneficiary__id = 'beneficiary__id',
  beneficiary__totalStaked = 'beneficiary__totalStaked',
  beneficiary__totalWithdrawn = 'beneficiary__totalWithdrawn',
  createdAt = 'createdAt',
  delegatee = 'delegatee',
  delegatee__claimedRewards = 'delegatee__claimedRewards',
  delegatee__createdAt = 'delegatee__createdAt',
  delegatee__currentlyStaked = 'delegatee__currentlyStaked',
  delegatee__id = 'delegatee__id',
  delegatee__totalStaked = 'delegatee__totalStaked',
  delegatee__totalWithdrawn = 'delegatee__totalWithdrawn',
  events = 'events',
  id = 'id',
  owner = 'owner',
  owner__claimedRewards = 'owner__claimedRewards',
  owner__createdAt = 'owner__createdAt',
  owner__currentlyStaked = 'owner__currentlyStaked',
  owner__id = 'owner__id',
  owner__totalStaked = 'owner__totalStaked',
  owner__totalWithdrawn = 'owner__totalWithdrawn',
  updatedAt = 'updatedAt'
}

export type Event = {
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export enum EventType {
  BeneficiaryAltered = 'BeneficiaryAltered',
  DelegateeAltered = 'DelegateeAltered',
  RewardClaimed = 'RewardClaimed',
  RewardNotified = 'RewardNotified',
  StakeDeposited = 'StakeDeposited',
  StakeWithdrawn = 'StakeWithdrawn',
  SurrogateDeployed = 'SurrogateDeployed'
}

export type Event_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Event_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Event_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum Event_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  id = 'id',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type FeesClaimed = {
  __typename?: 'FeesClaimed';
  amount0: Scalars['BigInt']['output'];
  amount1: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  caller: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  pool: Scalars['Bytes']['output'];
  recipient: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FeesClaimed_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount1?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FeesClaimed_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  caller?: InputMaybe<Scalars['Bytes']['input']>;
  caller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  caller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  caller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  caller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  caller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  caller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  caller_not?: InputMaybe<Scalars['Bytes']['input']>;
  caller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  caller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FeesClaimed_filter>>>;
  pool?: InputMaybe<Scalars['Bytes']['input']>;
  pool_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pool_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pool_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pool_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pool_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pool_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FeesClaimed_orderBy {
  amount0 = 'amount0',
  amount1 = 'amount1',
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  caller = 'caller',
  id = 'id',
  pool = 'pool',
  recipient = 'recipient',
  transactionHash = 'transactionHash'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountEvent?: Maybe<AccountEvent>;
  accountEvents: Array<AccountEvent>;
  accounts: Array<Account>;
  adminSet?: Maybe<AdminSet>;
  adminSets: Array<AdminSet>;
  beneficiaryAltered?: Maybe<BeneficiaryAltered>;
  beneficiaryAltereds: Array<BeneficiaryAltered>;
  delegateeAltered?: Maybe<DelegateeAltered>;
  delegateeAltereds: Array<DelegateeAltered>;
  deposit?: Maybe<Deposit>;
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  deposits: Array<Deposit>;
  event?: Maybe<Event>;
  events: Array<Event>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  rewardClaimed?: Maybe<RewardClaimed>;
  rewardClaimeds: Array<RewardClaimed>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  rewardNotified?: Maybe<RewardNotified>;
  rewardNotifieds: Array<RewardNotified>;
  stakeDeposited?: Maybe<StakeDeposited>;
  stakeDepositeds: Array<StakeDeposited>;
  stakeWithdrawn?: Maybe<StakeWithdrawn>;
  stakeWithdrawns: Array<StakeWithdrawn>;
  surrogate?: Maybe<Surrogate>;
  surrogateDeployed?: Maybe<SurrogateDeployed>;
  surrogateDeployeds: Array<SurrogateDeployed>;
  surrogates: Array<Surrogate>;
  uniStakerHistories: Array<UniStakerHistory>;
  uniStakerHistory?: Maybe<UniStakerHistory>;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type QueryaccountArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountEvent_filter>;
};


export type QueryaccountsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_filter>;
};


export type QueryadminSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadminSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AdminSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminSet_filter>;
};


export type QuerybeneficiaryAlteredArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybeneficiaryAlteredsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BeneficiaryAltered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BeneficiaryAltered_filter>;
};


export type QuerydelegateeAlteredArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateeAlteredsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegateeAltered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateeAltered_filter>;
};


export type QuerydepositArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositEvent_filter>;
};


export type QuerydepositsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Deposit_filter>;
};


export type QueryeventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryeventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_filter>;
};


export type QueryfeesClaimedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeesClaimedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeesClaimed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeesClaimed_filter>;
};


export type QueryrewardClaimedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardClaimedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardClaimed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardClaimed_filter>;
};


export type QueryrewardEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEvent_filter>;
};


export type QueryrewardNotifiedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardNotifiedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardNotified_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardNotified_filter>;
};


export type QuerystakeDepositedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeDepositedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeDeposited_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakeDeposited_filter>;
};


export type QuerystakeWithdrawnArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeWithdrawnsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeWithdrawn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakeWithdrawn_filter>;
};


export type QuerysurrogateArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysurrogateDeployedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysurrogateDeployedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SurrogateDeployed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SurrogateDeployed_filter>;
};


export type QuerysurrogatesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Surrogate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Surrogate_filter>;
};


export type QueryuniStakerHistoriesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniStakerHistory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UniStakerHistory_filter>;
};


export type QueryuniStakerHistoryArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type RewardClaimed = Event & RewardEvent & {
  __typename?: 'RewardClaimed';
  amount: Scalars['BigInt']['output'];
  beneficiary: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type RewardClaimed_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RewardClaimed_filter>>>;
  beneficiary?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_gt?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_gte?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  beneficiary_lt?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_lte?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_not?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RewardClaimed_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum RewardClaimed_orderBy {
  amount = 'amount',
  beneficiary = 'beneficiary',
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  id = 'id',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type RewardEvent = {
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type RewardEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RewardEvent_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RewardEvent_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum RewardEvent_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  id = 'id',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type RewardNotified = Event & RewardEvent & {
  __typename?: 'RewardNotified';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type RewardNotified_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RewardNotified_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RewardNotified_filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum RewardNotified_orderBy {
  amount = 'amount',
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  id = 'id',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type StakeDeposited = DepositEvent & Event & {
  __typename?: 'StakeDeposited';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deposit: Deposit;
  depositId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  totalDeposited: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type StakeDeposited_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<StakeDeposited_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StakeDeposited_filter>>>;
  totalDeposited?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDeposited_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum StakeDeposited_orderBy {
  amount = 'amount',
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  deposit = 'deposit',
  depositId = 'depositId',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  id = 'id',
  totalDeposited = 'totalDeposited',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type StakeWithdrawn = DepositEvent & Event & {
  __typename?: 'StakeWithdrawn';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  deposit: Deposit;
  depositId: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  remainingAmount: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type StakeWithdrawn_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<StakeWithdrawn_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  depositId?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_?: InputMaybe<Deposit_filter>;
  deposit_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_gt?: InputMaybe<Scalars['String']['input']>;
  deposit_gte?: InputMaybe<Scalars['String']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_lt?: InputMaybe<Scalars['String']['input']>;
  deposit_lte?: InputMaybe<Scalars['String']['input']>;
  deposit_not?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains?: InputMaybe<Scalars['String']['input']>;
  deposit_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deposit_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with?: InputMaybe<Scalars['String']['input']>;
  deposit_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StakeWithdrawn_filter>>>;
  remainingAmount?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  remainingAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  remainingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum StakeWithdrawn_orderBy {
  amount = 'amount',
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  deposit = 'deposit',
  depositId = 'depositId',
  deposit__amount = 'deposit__amount',
  deposit__createdAt = 'deposit__createdAt',
  deposit__id = 'deposit__id',
  deposit__updatedAt = 'deposit__updatedAt',
  id = 'id',
  remainingAmount = 'remainingAmount',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountEvent?: Maybe<AccountEvent>;
  accountEvents: Array<AccountEvent>;
  accounts: Array<Account>;
  adminSet?: Maybe<AdminSet>;
  adminSets: Array<AdminSet>;
  beneficiaryAltered?: Maybe<BeneficiaryAltered>;
  beneficiaryAltereds: Array<BeneficiaryAltered>;
  delegateeAltered?: Maybe<DelegateeAltered>;
  delegateeAltereds: Array<DelegateeAltered>;
  deposit?: Maybe<Deposit>;
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  deposits: Array<Deposit>;
  event?: Maybe<Event>;
  events: Array<Event>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  rewardClaimed?: Maybe<RewardClaimed>;
  rewardClaimeds: Array<RewardClaimed>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  rewardNotified?: Maybe<RewardNotified>;
  rewardNotifieds: Array<RewardNotified>;
  stakeDeposited?: Maybe<StakeDeposited>;
  stakeDepositeds: Array<StakeDeposited>;
  stakeWithdrawn?: Maybe<StakeWithdrawn>;
  stakeWithdrawns: Array<StakeWithdrawn>;
  surrogate?: Maybe<Surrogate>;
  surrogateDeployed?: Maybe<SurrogateDeployed>;
  surrogateDeployeds: Array<SurrogateDeployed>;
  surrogates: Array<Surrogate>;
  uniStakerHistories: Array<UniStakerHistory>;
  uniStakerHistory?: Maybe<UniStakerHistory>;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type SubscriptionaccountArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountEvent_filter>;
};


export type SubscriptionaccountsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_filter>;
};


export type SubscriptionadminSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadminSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AdminSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminSet_filter>;
};


export type SubscriptionbeneficiaryAlteredArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbeneficiaryAlteredsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BeneficiaryAltered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BeneficiaryAltered_filter>;
};


export type SubscriptiondelegateeAlteredArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateeAlteredsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegateeAltered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateeAltered_filter>;
};


export type SubscriptiondepositArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositEvent_filter>;
};


export type SubscriptiondepositsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Deposit_filter>;
};


export type SubscriptioneventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioneventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_filter>;
};


export type SubscriptionfeesClaimedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeesClaimedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeesClaimed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeesClaimed_filter>;
};


export type SubscriptionrewardClaimedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardClaimedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardClaimed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardClaimed_filter>;
};


export type SubscriptionrewardEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEvent_filter>;
};


export type SubscriptionrewardNotifiedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardNotifiedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardNotified_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardNotified_filter>;
};


export type SubscriptionstakeDepositedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeDepositedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeDeposited_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakeDeposited_filter>;
};


export type SubscriptionstakeWithdrawnArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeWithdrawnsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeWithdrawn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakeWithdrawn_filter>;
};


export type SubscriptionsurrogateArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsurrogateDeployedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsurrogateDeployedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SurrogateDeployed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SurrogateDeployed_filter>;
};


export type SubscriptionsurrogatesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Surrogate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Surrogate_filter>;
};


export type SubscriptionuniStakerHistoriesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UniStakerHistory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UniStakerHistory_filter>;
};


export type SubscriptionuniStakerHistoryArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Surrogate = {
  __typename?: 'Surrogate';
  createdAt: Scalars['Int']['output'];
  delegatee: Account;
  id: Scalars['Bytes']['output'];
};

export type SurrogateDeployed = Event & {
  __typename?: 'SurrogateDeployed';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  delegatee: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  surrogate: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  type: EventType;
};

export type SurrogateDeployed_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SurrogateDeployed_filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatee?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_contains?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_gt?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_gte?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  delegatee_lt?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_lte?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_not?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  delegatee_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<SurrogateDeployed_filter>>>;
  surrogate?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_contains?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_gt?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_gte?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  surrogate_lt?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_lte?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_not?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  surrogate_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_not?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export enum SurrogateDeployed_orderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  delegatee = 'delegatee',
  id = 'id',
  surrogate = 'surrogate',
  transactionHash = 'transactionHash',
  type = 'type'
}

export type Surrogate_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Surrogate_filter>>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatee?: InputMaybe<Scalars['String']['input']>;
  delegatee_?: InputMaybe<Account_filter>;
  delegatee_contains?: InputMaybe<Scalars['String']['input']>;
  delegatee_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_gt?: InputMaybe<Scalars['String']['input']>;
  delegatee_gte?: InputMaybe<Scalars['String']['input']>;
  delegatee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_lt?: InputMaybe<Scalars['String']['input']>;
  delegatee_lte?: InputMaybe<Scalars['String']['input']>;
  delegatee_not?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Surrogate_filter>>>;
};

export enum Surrogate_orderBy {
  createdAt = 'createdAt',
  delegatee = 'delegatee',
  delegatee__claimedRewards = 'delegatee__claimedRewards',
  delegatee__createdAt = 'delegatee__createdAt',
  delegatee__currentlyStaked = 'delegatee__currentlyStaked',
  delegatee__id = 'delegatee__id',
  delegatee__totalStaked = 'delegatee__totalStaked',
  delegatee__totalWithdrawn = 'delegatee__totalWithdrawn',
  id = 'id'
}

export type UniStakerHistory = {
  __typename?: 'UniStakerHistory';
  claimedRewards: Scalars['BigInt']['output'];
  currentlyStaked: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  totalRewards: Scalars['BigInt']['output'];
  totalStaked: Scalars['BigInt']['output'];
  totalWithdrawn: Scalars['BigInt']['output'];
};

export type UniStakerHistory_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UniStakerHistory_filter>>>;
  claimedRewards?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimedRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentlyStaked?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentlyStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentlyStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<UniStakerHistory_filter>>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawn?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum UniStakerHistory_orderBy {
  claimedRewards = 'claimedRewards',
  currentlyStaked = 'currentlyStaked',
  id = 'id',
  timestamp = 'timestamp',
  totalRewards = 'totalRewards',
  totalStaked = 'totalStaked',
  totalWithdrawn = 'totalWithdrawn'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny'
}

export type DepositsQueryVariables = Exact<{
  account?: InputMaybe<Scalars['String']['input']>;
}>;


export type DepositsQuery = { __typename?: 'Query', deposits: Array<{ __typename?: 'Deposit', id: string, amount: any, createdAt: number, updatedAt: number, beneficiary: { __typename?: 'Account', id: any }, delegatee: { __typename?: 'Account', id: any }, owner: { __typename?: 'Account', id: any } }> };


export const DepositsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Deposits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"amount_gt"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"delegatee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"beneficiary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"beneficiary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"delegatee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DepositsQuery, DepositsQueryVariables>;