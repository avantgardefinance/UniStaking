import { graphql } from "@/lib/generated/subgraph/gql"

export const AccountEventsQuery = graphql(`
    query AccountEvents($account: String!) {
      accountEvents(where: { account: $account }) {
        event {
          ... on BeneficiaryAltered {
            type
            deposit {
              owner {
                id
              }
              id
            }
            oldBeneficiary
            newBeneficiary
            blockTimestamp
          }
          ... on DelegateeAltered {
            newDelegatee
            oldDelegatee
            blockTimestamp
            deposit {
              owner {
                id
              }
              id
            }
            type
          }
          ... on StakeDeposited {
            type
            amount
            blockTimestamp
            deposit {
              owner {
                id
              }
              id
            }
          }
          ... on RewardClaimed {
            beneficiary
            blockTimestamp
            amount
            type
          }
          ... on StakeWithdrawn {
            amount
            blockTimestamp
            deposit {
              owner {
                id
              }
              id
            }
            type
          }
        }
      }
}
`)
