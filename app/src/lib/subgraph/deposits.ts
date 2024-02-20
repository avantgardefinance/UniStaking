import { graphql } from "@/lib/generated/subgraph/gql"

export const DepositsQuery = graphql(`
  query Deposits($account: String!, $accountId: ID!) {
    account(id: $accountId) {
      currentlyStaked
    }
    deposits(where: {
      and: [{
        amount_gt: 0,
      }, {
        or: [{
          owner: $account,
        }, {
          delegatee: $account,
        }, {
          beneficiary: $account
        }]
      }]
    }) {
      beneficiary {
        id
      }
      delegatee {
        id
      }
      owner {
        id
      }
      id
      amount
      createdAt
      updatedAt
    }
  }
`)
