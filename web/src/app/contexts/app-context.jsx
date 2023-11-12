/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AppContext = createContext({
  isLoading: false,
  refetch: false,
  store: null,
})

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [store, setStore] = useState(
    localStorage?.getItem('store') !== 'undefined'
      ? JSON.parse(localStorage.getItem('store'))
      : null
  )
  const handleStore = (storeData) => {
    setStore(storeData)
    localStorage.setItem('store', JSON.stringify(storeData))
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        refetch,
        setRefetch,
        store,
        handleStore,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
