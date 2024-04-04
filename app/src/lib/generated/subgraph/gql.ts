/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  query BlockNumber {\n    _meta {\n      block {\n        number\n      }\n    }\n  }\n": types.BlockNumberDocument,
    "\n  query Deposits($account: String!, $accountId: ID!) {\n    account(id: $accountId) {\n      currentlyStaked\n    }\n    deposits(where: {\n      and: [{\n        amount_gt: 0,\n      }, {\n        or: [{\n          owner: $account,\n        }, {\n          delegatee: $account,\n        }, {\n          beneficiary: $account\n        }]\n      }]\n    }) {\n      beneficiary {\n        id\n      }\n      delegatee {\n        id\n      }\n      owner {\n        id\n      }\n      id\n      amount\n      createdAt\n      updatedAt\n    }\n  }\n": types.DepositsDocument,
    "\n  query Events($account: Bytes!) {\n    events(where: { affected_contains: [$account]}, orderBy: blockTimestamp, orderDirection: desc, first: 1000) {\n      __typename\n      id\n      blockTimestamp\n      ... on BeneficiaryAltered {\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n        oldBeneficiary\n        newBeneficiary\n      }\n      ... on DelegateeAltered {\n        newDelegatee\n        oldDelegatee\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on StakeDeposited {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on RewardClaimed {\n        beneficiary\n        amount\n      }\n      ... on StakeWithdrawn {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n": types.EventsDocument,
};

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
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BlockNumber {\n    _meta {\n      block {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query BlockNumber {\n    _meta {\n      block {\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Deposits($account: String!, $accountId: ID!) {\n    account(id: $accountId) {\n      currentlyStaked\n    }\n    deposits(where: {\n      and: [{\n        amount_gt: 0,\n      }, {\n        or: [{\n          owner: $account,\n        }, {\n          delegatee: $account,\n        }, {\n          beneficiary: $account\n        }]\n      }]\n    }) {\n      beneficiary {\n        id\n      }\n      delegatee {\n        id\n      }\n      owner {\n        id\n      }\n      id\n      amount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Deposits($account: String!, $accountId: ID!) {\n    account(id: $accountId) {\n      currentlyStaked\n    }\n    deposits(where: {\n      and: [{\n        amount_gt: 0,\n      }, {\n        or: [{\n          owner: $account,\n        }, {\n          delegatee: $account,\n        }, {\n          beneficiary: $account\n        }]\n      }]\n    }) {\n      beneficiary {\n        id\n      }\n      delegatee {\n        id\n      }\n      owner {\n        id\n      }\n      id\n      amount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Events($account: Bytes!) {\n    events(where: { affected_contains: [$account]}, orderBy: blockTimestamp, orderDirection: desc, first: 1000) {\n      __typename\n      id\n      blockTimestamp\n      ... on BeneficiaryAltered {\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n        oldBeneficiary\n        newBeneficiary\n      }\n      ... on DelegateeAltered {\n        newDelegatee\n        oldDelegatee\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on StakeDeposited {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on RewardClaimed {\n        beneficiary\n        amount\n      }\n      ... on StakeWithdrawn {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Events($account: Bytes!) {\n    events(where: { affected_contains: [$account]}, orderBy: blockTimestamp, orderDirection: desc, first: 1000) {\n      __typename\n      id\n      blockTimestamp\n      ... on BeneficiaryAltered {\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n        oldBeneficiary\n        newBeneficiary\n      }\n      ... on DelegateeAltered {\n        newDelegatee\n        oldDelegatee\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on StakeDeposited {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n      ... on RewardClaimed {\n        beneficiary\n        amount\n      }\n      ... on StakeWithdrawn {\n        amount\n        deposit {\n          owner {\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;