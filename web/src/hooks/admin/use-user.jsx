import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../../libs/fetcher'
import useFilter from '../use-filter'
import useApp from '../use-app'

export function useFilterUsers() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, priority, page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: [
      'users',
      search,
      priority,
      page,
      perPage,
      // chatStatus,
      // actived,
    ],
    queryFn: async () =>
      await get(
        `/users/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useUser(id) {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (id) return await get(`/users/${id}`, setIsLoading, toast)
      return null
    },
    staleTime: 1000 * 60 * 1,
  })

  return { ...data }
}
