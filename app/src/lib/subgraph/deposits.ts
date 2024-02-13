import { graphql } from "@/lib/generated/subgraph/gql"

export const DepositsQuery = graphql(`
  query Deposits($account: String!) {
    deposits(where: { amount_gt: 0, owner: $account, delegatee: $account, beneficiary: $account}) {
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
