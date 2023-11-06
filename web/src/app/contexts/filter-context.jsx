/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const FilterContext = createContext({
  search: '',
  priority: '',
  page: 1,
  perPage: 10,
  totalCount: '',
  totalPage: 0,
  featured: true,
  actived: true,
  category: '',
  brand: '',
})

export default function FilterContextProvider({ children }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState('')
  const [totalPage, setTotalPage] = useState(0)
  const [featured, setFeatured] = useState(true)
  const [actived, setActived] = useState(true)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')

  const handleClear = () => {
    setSearch('')
    setPriority('')
    setPage(1)
    setPerPage(10)
    setTotalCount('')
    setTotalPage(0)
    setFeatured(true)
    setActived(true)
    setCategory('')
    setBrand('')
  }

  return (
    <FilterContext.Provider value={{
      search, setSearch,
      priority, setPriority,
      page, setPage,
      perPage, setPerPage,
      totalCount, setTotalCount,
      totalPage, setTotalPage,
      featured, setFeatured,
      actived, setActived,
      category, setCategory,
      brand, setBrand,
      handleClear,
    }}>
      {children}
    </FilterContext.Provider>
  )
}
