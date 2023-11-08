import { useQuery } from '@tanstack/react-query'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'

export function useFilterColors() {
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['colors', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/colors/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`
      ),
    staleTime: 1000 * 60 * 1,
  })

  return { ...data }
}

export function useColors() {
  const { data } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await get('/colors'),
    staleTime: 1000 * 60 * 1,
  })

  return data
}
