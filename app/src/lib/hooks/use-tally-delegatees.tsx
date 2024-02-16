import { TallyDelegateesSchema } from "@/app/api/delegatees/model"
import { Schema } from "@effect/schema"
import { useQuery } from "@tanstack/react-query"

const decode = Schema.decodeSync(TallyDelegateesSchema)

export function useTallyDelegatees() {
  return useQuery({
    queryKey: ["delegatees"],
    queryFn: async () => {
      const response = await fetch("/api/delegatees")
      if (!response.ok) {
        throw new Error("Failed to fetch delegatees")
      }

      return decode(await response.json())
    }
  })
}
