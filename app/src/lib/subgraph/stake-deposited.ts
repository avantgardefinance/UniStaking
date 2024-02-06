import { graphql } from "@/lib/generated/subgraph/gql"

export const StakeDeposited = graphql(`
  query StakeDeposited {
    stakeDepositeds {
      id
    }
  }
`)
