import { useQuery } from '@tanstack/react-query'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'

export function useBrands() {
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['brands', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/brands/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`
      ),
    staleTime: 1000 * 60 * 1,
  })

  return { ...data }
}
