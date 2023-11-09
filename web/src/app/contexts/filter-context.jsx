/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const FilterContext = createContext({
  search: '',
  priority: '',
  page: 1,
  perPage: 10,
  featured: true,
  actived: true,
  category: '',
  brand: '',
  chatStatus: true,
})

export default function FilterContextProvider({ children }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [featured, setFeatured] = useState(true)
  const [actived, setActived] = useState(true)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [chatStatus, setChatStatus] = useState(true)

  const handleClear = () => {
    setSearch('')
    setPriority('')
    setPage(1)
    setPerPage(10)
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
      featured, setFeatured,
      actived, setActived,
      category, setCategory,
      brand, setBrand,
      chatStatus, setChatStatus,
      handleClear,
    }}>
      {children}
    </FilterContext.Provider>
  )
}
