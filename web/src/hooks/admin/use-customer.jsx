import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../../libs/fetcher'
import useFilter from '../use-filter'
import useApp from '../use-app'

export function useCustomers() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: [
      'customers',
      search,
      priority,
      page,
      perPage,
      // chatStatus,
      // actived,
    ],
    queryFn: async () =>
      await get(
        `/customers/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useCustomer(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => await get(`/customers/${id}`, setIsLoading, toast),
    staleTime: 1000 * 60 * 1,
  })
  return { ...data }
}
