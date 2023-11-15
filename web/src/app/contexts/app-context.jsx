/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

import useLocalStorage from '../../hooks/use-localStorage'

export const AppContext = createContext({
  isLoading: false,
  refetch: false,
  store: null,
  payment: null,
  cartItems: [],
})

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const { value: store, handleUpdate: handleStore } = useLocalStorage(
    'store',
    null
  )
  const { value: payment, handleUpdate: handlePayment } = useLocalStorage(
    'payment',
    null
  )
  const { value: cartItems, handleUpdate: handleCartItems } = useLocalStorage(
    'cart-items',
    []
  )

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        refetch,
        setRefetch,
        store,
        handleStore,
        payment,
        handlePayment,
        cartItems,
        handleCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
