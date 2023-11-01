/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const FilterContext = createContext({
  search: '',
  priority: '',
  page: 1,
  perPage: 10,
  totalCount: '',
  totalPage: 0,
})

export default function FilterContextProvider({ children }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState('')
  const [totalPage, setTotalPage] = useState(0)

  return (
    <FilterContext.Provider value={{
      search, setSearch,
      priority, setPriority,
      page, setPage,
      perPage, setPerPage,
      totalCount, setTotalCount,
      totalPage, setTotalPage,
    }}>
      {children}
    </FilterContext.Provider>
  )
}
