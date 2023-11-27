import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { get } from '../libs/fetcher'
import useApp from './use-app'
import useFilter from './use-filter'
import useUser from './use-user'

export const useFilterProducts = () => {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { search, brand, category, priceRange, priority, page, perPage } =
    useFilter()

  const { data } = useQuery({
    queryKey: [
      'products',
      search,
      brand,
      category,
      priceRange,
      priority,
      page,
      perPage,
    ],
    queryFn: async () =>
      await get(
        `/products/search?search=${search}&brand=${brand.join(
          ','
        )}&category=${category}&priceRange=${priceRange}&priority=${priority}&page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useProduct(id, isPopulateColor) {
  const { setIsLoading } = useApp()
  const endPoint = isPopulateColor
    ? `/products/${id}?color=true`
    : `/products/${id}`

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (id) return await get(endPoint, setIsLoading, toast)
      return null
    },
  })

  return { ...data }
}

export function useProducts() {
  const { setIsLoading } = useApp()

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await get('/products', setIsLoading, toast),
    staleTime: 1000 * 60 * 1,
  })

  return data
}

export function useFilterFavorits() {
  const { setIsLoading, refetch } = useApp()
  const { page } = useFilter()
  const { user, token } = useUser()

  const { data } = useQuery({
    queryKey: ['favorits', page],
    queryFn: async () => {
      if (user && token)
        return await get(
          `/customers/favorits/search?page=${page}`,
          setIsLoading,
          toast
        )
      return null
    },
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return { ...data }
}

export function useCompare() {
  const { setIsLoading } = useApp()
  const { user, token } = useUser()

  const { data } = useQuery({
    queryKey: ['compare'],
    queryFn: async () => {
      if (user && token)
        return await get('/customers/compare', setIsLoading, toast)
      return null
    },
    staleTime: 1000 * 60 * 1,
  })

  return data
}

export function useLastHistory() {
  const { setIsLoading, refetch, setRefetch } = useApp()

  const { data } = useQuery({
    queryKey: ['last-history'],
    queryFn: async () =>
      await get(`/customers/last-history`, setIsLoading, toast, setRefetch),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return data
}

export function useFilterHistory() {
  const { setIsLoading, refetch, setRefetch } = useApp()
  const { page, perPage } = useFilter()

  const { data } = useQuery({
    queryKey: ['history', page],
    queryFn: async () =>
      await get(
        `/customers/history/search?page=${page}&perPage=${perPage}`,
        setIsLoading,
        toast,
        setRefetch
      ),
    staleTime: refetch ? 0 : 1000 * 60 * 1,
  })

  return data
}
