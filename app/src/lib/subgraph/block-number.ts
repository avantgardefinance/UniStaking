import { graphql } from "@/lib/generated/subgraph/gql"

export const BlockNumberQuery = graphql(`
  query BlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`)
