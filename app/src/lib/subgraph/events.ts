import { graphql } from "@/lib/generated/subgraph/gql"

export const EventsQuery = graphql(`
  query Events($account: Bytes!) {
    events(where: { affected_contains: [$account]}, orderBy: blockTimestamp, orderDirection: desc, first: 1000) {
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
`)
