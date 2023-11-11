import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'
import useApp from './use-app'

export function useFilterColors() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['colors', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/colors/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useColors() {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await get('/colors', setIsLoading, toast),
    staleTime: 1000 * 60 * 1,
  })

  return data
}

export function useColor(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['color', id],
    queryFn: async () => {
      if (id) return await get(`/colors/${id}`, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}
