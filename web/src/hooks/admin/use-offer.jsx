import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../../libs/fetcher'
import useApp from '../use-app'
import useFilter from '../use-filter'

export function useFilterOffers() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const {
    search,
    priority,
    offer,
    discount,
    startDate,
    endDate,
    page,
    perPage,
  } = useFilter()

  const { data } = useQuery({
    queryKey: [
      'offers',
      search,
      priority,
      offer,
      discount,
      startDate,
      endDate,
      page,
      perPage,
    ],
    queryFn: async () =>
      await get(
        `/offers/search?search=${search}&priority=${priority}&offer=${offer}&discount=${discount}&startDate=${
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
