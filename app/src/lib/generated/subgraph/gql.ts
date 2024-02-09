/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n    query AccountEvents($account: String!) {\n      accountEvents(where: { account: $account }) {\n        event {\n          __typename\n          id\n          blockTimestamp\n          ... on BeneficiaryAltered {\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n            oldBeneficiary\n            newBeneficiary\n          }\n          ... on DelegateeAltered {\n            newDelegatee\n            oldDelegatee\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on StakeDeposited {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on RewardClaimed {\n            beneficiary\n            amount\n          }\n          ... on StakeWithdrawn {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n        }\n      }\n}\n":
    types.AccountEventsDocument,
  "\n    query Deposits($account: String!) {\n      deposits(where: { amount_gt: 0, owner: $account, delegatee: $account, beneficiary: $account}) {\n        beneficiary {\n          id\n        }\n        delegatee {\n          id\n        }\n        owner {\n          id\n        }\n        id\n        amount\n        createdAt\n        updatedAt\n      }\n  }\n":
    types.DepositsDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query AccountEvents($account: String!) {\n      accountEvents(where: { account: $account }) {\n        event {\n          __typename\n          id\n          blockTimestamp\n          ... on BeneficiaryAltered {\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n            oldBeneficiary\n            newBeneficiary\n          }\n          ... on DelegateeAltered {\n            newDelegatee\n            oldDelegatee\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on StakeDeposited {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on RewardClaimed {\n            beneficiary\n            amount\n          }\n          ... on StakeWithdrawn {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n        }\n      }\n}\n"
): (typeof documents)["\n    query AccountEvents($account: String!) {\n      accountEvents(where: { account: $account }) {\n        event {\n          __typename\n          id\n          blockTimestamp\n          ... on BeneficiaryAltered {\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n            oldBeneficiary\n            newBeneficiary\n          }\n          ... on DelegateeAltered {\n            newDelegatee\n            oldDelegatee\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on StakeDeposited {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n          ... on RewardClaimed {\n            beneficiary\n            amount\n          }\n          ... on StakeWithdrawn {\n            amount\n            deposit {\n              owner {\n                id\n              }\n              id\n            }\n          }\n        }\n      }\n}\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query Deposits($account: String!) {\n      deposits(where: { amount_gt: 0, owner: $account, delegatee: $account, beneficiary: $account}) {\n        beneficiary {\n          id\n        }\n        delegatee {\n          id\n        }\n        owner {\n          id\n        }\n        id\n        amount\n        createdAt\n        updatedAt\n      }\n  }\n"
): (typeof documents)["\n    query Deposits($account: String!) {\n      deposits(where: { amount_gt: 0, owner: $account, delegatee: $account, beneficiary: $account}) {\n        beneficiary {\n          id\n        }\n        delegatee {\n          id\n        }\n        owner {\n          id\n        }\n        id\n        amount\n        createdAt\n        updatedAt\n      }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
