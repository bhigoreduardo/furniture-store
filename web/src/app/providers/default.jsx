/* eslint-disable react/prop-types */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AppContextProvider from '../contexts/app-context'
import UserContextProvider from '../contexts/user-context'
import FilterContextProvider from '../contexts/filter-context'

export default function DefaultProvider({ children }) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <AppContextProvider>
        <UserContextProvider>
          <FilterContextProvider>
            <ToastContainer
              position="top-right"
              // autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            {children}
          </FilterContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}
