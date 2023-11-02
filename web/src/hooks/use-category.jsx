import { useQuery } from '@tanstack/react-query'

import { get } from '../libs/fetcher'
import useFilter from './use-filter'

export default function useCategory() {
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['categories', search, priority, page, perPage],
    queryFn: async () =>
      await get(
        `/categories/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`
      ),
    staleTime: 1000 * 60 * 1,
  })

  return { ...data }
}
