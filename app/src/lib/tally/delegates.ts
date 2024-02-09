import { graphql } from "@/lib/generated/tally/gql";

export const DelegatesQuery = graphql(`
  query Delegates($input: DelegatesInput!) {
    delegates(input: $input) {
      nodes {
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
        firstCursor
        lastCursor
      }
    }
  }
`);
