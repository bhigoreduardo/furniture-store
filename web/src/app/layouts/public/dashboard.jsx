/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'

import { UserEnum } from '../../../types/user-type'
import useUser from '../../../hooks/use-user'
import Container from '../../components/ui/container'
import Sidebar from '../../components/navigation/public/dashboard/sidebar'

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useUser()

  if (!user || !token || user?._type !== UserEnum.Customer)
    return <Navigate to="/entrar" />
  return children
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Container className="flex items-start gap-6 py-[40px]">
        <Sidebar />
        <Outlet />
      </Container>
    </ProtectedRoute>
  )
}
