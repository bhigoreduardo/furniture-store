/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { usePayments } from '../../../hooks/use-payment'
import useApp from '../../../hooks/use-app'
import Header from '../../components/navigation/public/header'
import Footer from '../../components/navigation/public/footer'
import Copyright from '../../components/ui/copyright'

export default function Public() {
  const { handlePayment } = useApp()
  const payments = usePayments()

  // const ProtectedRoute = ({ children }) => {
  //   if (store === null) return null
  //   else if (!store?.available) return <Navigate to="/manutencao" />

  //   return children
  // }

  useEffect(() => {
    if (payments) handlePayment(payments)
  }, [payments]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <Copyright />
    </main>
  )
}
