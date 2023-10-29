/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AppContext = createContext({
  isLoading: false,
})

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}
