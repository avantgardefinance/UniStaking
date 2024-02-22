import { QueryClient } from "@tanstack/react-query"
import { ActionArgs } from "xstate"

export function invalidateQueries(_: ActionArgs<any, any, any>, client: QueryClient) {
  client.invalidateQueries()
}
