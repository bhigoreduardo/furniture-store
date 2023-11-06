/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AdminContext = createContext({
  isSidebar: true,
})

export default function AdminContextProvider({ children }) {
  const [isSidebar, setIsSidebard] = useState(true)
  const toggleSidebar = () => setIsSidebard((prevState) => !prevState)

  return (
    <AdminContext.Provider value={{ isSidebar, toggleSidebar }}>
      {children}
    </AdminContext.Provider>
  )
}
