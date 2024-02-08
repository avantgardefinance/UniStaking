import { useQuery } from "@tanstack/react-query"

export function useTallyDelegates() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["delegatees"],
    queryFn: async () => {
      const response = await fetch("/api/delegates")
      return response.json()
    }
  })

  return {
    tallyDelegatees: data ?? [],
    isLoading,
    isError,
    error
  }
}
