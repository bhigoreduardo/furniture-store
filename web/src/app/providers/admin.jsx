/* eslint-disable react/prop-types */
import AdminContextProvider from '../contexts/admin-content'

export default function AdminProvider({ children }) {
  return <AdminContextProvider>{children}</AdminContextProvider>
}
