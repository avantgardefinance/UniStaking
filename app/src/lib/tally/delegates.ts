import { graphql } from "@/lib/generated/tally/gql"

export const DelegatesQuery = graphql(`
  query Delegates($input: DelegatesInput!) {
    delegates(input: $input) {
      nodes {
        __typename
        ... on Delegate {
          account {
            address
            name
            ens
          }
          votesCount
        }
      }
      pageInfo {
        lastCursor
      }
    }
  }
`)
