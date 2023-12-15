import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useApp from './use-app'

export function usePayments() {
  const { setIsLoading, refetch, setRefetch } = useApp()

  const { data } = useQuery({
    queryKey: ['payments'],
    queryFn: async () =>
      await get('/payments', setIsLoading, toast, setRefetch),
    staleTime: refetch ? 0 : 1000 * 60 * 60,
  })

  return data
}
