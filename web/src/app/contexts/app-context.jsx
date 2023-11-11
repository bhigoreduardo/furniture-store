/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AppContext = createContext({
  isLoading: false,
  refetch: false,
})

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)

  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, refetch, setRefetch }}
    >
      {children}
    </AppContext.Provider>
  )
}
