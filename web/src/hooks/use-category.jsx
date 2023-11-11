import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'
import useApp from './use-app'

export function useFilterCategories() {
  const { setIsLoading, refetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['categories', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/categories/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useCategory(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (id) return await get(`/categories/${id}`, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}

export function useCategories() {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await get('/categories', setIsLoading, toast),
    staleTime: 1000 * 60 * 1,
  })

  return data
}
