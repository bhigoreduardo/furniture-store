import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'
import useApp from './use-app'

export function useFilterBrands() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['brands', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/brands/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useBrands() {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => await get('/brands', setIsLoading, toast),
    staleTime: 1000 * 60 * 1,
  })

  return data
}

export function useBrand(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['brand', id],
    queryFn: async () => {
      if (id) return await get(`/brands/${id}`, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}
