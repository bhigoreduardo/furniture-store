import { useQuery } from '@tanstack/react-query'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'

export function useCustomers() {
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
        `/customers/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`
      ),
    staleTime: 1000 * 60 * 1,
  })

  return { ...data }
}

export function useCustomer(id) {
  const { data } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => await get(`/customers/${id}`),
    staleTime: 1000 * 60 * 1,
  })
  return { ...data }
}
