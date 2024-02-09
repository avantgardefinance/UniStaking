import { graphql } from "@/lib/generated/subgraph/gql"

export const AccountEventsQuery = graphql(`
    query AccountEvents($account: String!) {
      # TODO add this: orderBy: event__blockTimestamp, orderDirection: desc
      accountEvents(where: { account: $account}, first: 1000) {
        event {
          __typename
          id
          blockTimestamp
          ... on BeneficiaryAltered {
            deposit {
              owner {
                id
              }
              id
            }
            oldBeneficiary
            newBeneficiary
          }
          ... on DelegateeAltered {
            newDelegatee
            oldDelegatee
            deposit {
              owner {
                id
              }
              id
            }
          }
          ... on StakeDeposited {
            amount
            deposit {
              owner {
                id
              }
              id
            }
          }
          ... on RewardClaimed {
            beneficiary
            amount
          }
          ... on StakeWithdrawn {
            amount
            deposit {
              owner {
                id
              }
              id
            }
          }
        }
      }
}
`)
