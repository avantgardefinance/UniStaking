import type { CodegenConfig } from "@graphql-codegen/cli"

const tallyApiKey = process.env.TALLY_API_KEY
if (tallyApiKey === undefined) {
  throw new Error("Missing `TALLY_API_KEY` environment variable")
}

const config: CodegenConfig = {
  generates: {
    "src/lib/generated/subgraph/": {
      schema: "http://localhost:8000/subgraphs/name/uniswap/staking",
      documents: "src/lib/subgraph/**/*.ts",
      preset: "client"
    },
    "src/lib/generated/tally/": {
      schema: {
        "https://api.tally.xyz/query": {
          headers: {
            "Api-Key": tallyApiKey
          }
        }
      },
      documents: "src/lib/tally/**/*.ts",
      preset: "client"
    }
  },
  config: { namingConvention: 'keep' }
}

export default config
