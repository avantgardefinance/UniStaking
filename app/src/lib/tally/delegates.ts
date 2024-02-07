import { graphql } from "@/lib/generated/tally/gql"

export const DelegatesQuery = graphql(`
  query Delegates($input: DelegatesInput!) {
    delegates(input: $input) {
      nodes {
        ... on Delegate {
          id
          account {
            address
            name
            twitter
          }
          votesCount
          delegatorsCount
        }
      }
      pageInfo {
        firstCursor
        lastCursor
      }
    }
  }
`)
