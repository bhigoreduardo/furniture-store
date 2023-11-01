import { useContext } from 'react'

import { FilterContext } from '../app/contexts/filter-context'

export default function useFilter() {
  return useContext(FilterContext)
}
