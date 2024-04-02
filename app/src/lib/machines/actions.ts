import type { QueryClient } from "@tanstack/react-query"
import type { ActionArgs } from "xstate"

export function invalidateQueries(_: ActionArgs<any, any, any>, client: QueryClient) {
  client.invalidateQueries()
}
