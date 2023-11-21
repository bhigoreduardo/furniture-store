/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const FilterContext = createContext({
  search: '',
  category: '',
  brand: [],
  priceRange: '-',
  priority: '',
  page: 1,
  perPage: 10,
  featured: true,
  actived: true,
  chatStatus: true,
  orderStatus: '',
  dateRange: '',
})

export default function FilterContextProvider({ children }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState([])
  const [priceRange, setPriceRange] = useState('-')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [featured, setFeatured] = useState(true)
  const [actived, setActived] = useState(true)
  const [chatStatus, setChatStatus] = useState(true)
  const [orderStatus, setOrderStatus] = useState('')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const handleClear = () => {
    setSearch('')
    setCategory('')
    setBrand('')
    setPriceRange('-')
    setPriority('')
    setPage(1)
    setPerPage(10)
    setFeatured(true)
    setActived(true)
    setOrderStatus('')
    setDateRange([null, null])
  }

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        brand,
        setBrand,
        priceRange,
        setPriceRange,
        priority,
        setPriority,
        page,
        setPage,
        perPage,
        setPerPage,
        featured,
        setFeatured,
        actived,
        setActived,
        chatStatus,
        setChatStatus,
        orderStatus,
        setOrderStatus,
        startDate,
        endDate,
        setDateRange,
        handleClear,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
