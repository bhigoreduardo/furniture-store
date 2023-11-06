import { Outlet } from 'react-router-dom'

import Header from '../../components/navigation/public/header'
import Footer from '../../components/navigation/public/footer'
import Copyright from '../../components/ui/copyright'

export default function Public() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <Copyright />
    </main>
  )
}
