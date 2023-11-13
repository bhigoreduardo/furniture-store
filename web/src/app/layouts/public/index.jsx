/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'

import useApp from '../../../hooks/use-app'
import Header from '../../components/navigation/public/header'
import Footer from '../../components/navigation/public/footer'
import Copyright from '../../components/ui/copyright'

export default function Public() {
  const { store } = useApp()

  // const ProtectedRoute = ({ children }) => {
  //   if (!store?.available) return <Navigate to="/manutencao" />
  //   return children
  // }

  return (
    // <ProtectedRoute>
      <main>
        <Header />
        <Outlet />
        <Footer />
        <Copyright />
      </main>
    // </ProtectedRoute>
  )
}
