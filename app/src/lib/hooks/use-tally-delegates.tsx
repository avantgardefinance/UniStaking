import type { TallyDelegatee } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export function useTallyDelegates() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["delegatees"],
    queryFn: async () => {
      const response = await fetch("/api/delegates")
      return response.json()
    }
  })

  // TODO: type that properly. Parse the tally response from api, and infer type from it
  const tallyDelegatees: Array<TallyDelegatee> = data?.map((
    delegatee: any
  ) => {
    const { account: { address, ens, name }, votesCount } = delegatee

    const label = name !== ""
      ? name
      : ens !== ""
      ? ens
      : address

    return {
      votesCount,
      label,
      address
    }
  }) ?? []

  return {
    tallyDelegatees,
    isLoading,
    isError,
    error
  }
}
