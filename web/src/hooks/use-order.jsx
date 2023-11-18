import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useApp from './use-app'
import useFilter from './use-filter'

export function useFilterOrders() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, orderStatus, startDate, endDate, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: [
      'orders',
      search,
      orderStatus,
      startDate,
      endDate,
      page,
      perPage,
    ],
    queryFn: async () =>
      await get(
        `/customers/search/orders?search=${search}&orderStatus=${orderStatus}&startDate=${
          startDate || ''
        }&endDate=${endDate || ''}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useOrder(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      if (id) return await get(`/customers/orders/${id}`, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}
