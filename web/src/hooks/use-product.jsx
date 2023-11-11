import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useApp from './use-app'
import useFilter from './use-filter'

export const useFilterProducts = () => {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['products', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/products/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useProduct(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (id) return await get(`/products/${id}`, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}
