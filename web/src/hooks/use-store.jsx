import { useQuery } from '@tanstack/react-query'

import { get } from '../libs/fetcher'
import useApp from './use-app'

export default function useStore() {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['store'],
    queryFn: async () => await get(`/stores`, setIsLoading),
    staleTime: 1000 * 60 * 60,
  })

  return data
}
