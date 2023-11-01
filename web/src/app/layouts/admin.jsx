import { Outlet } from 'react-router-dom'

import Header from '../components/navigation/admin/header'
import Sidebar from '../components/navigation/admin/sidebar'
import Copyright from '../components/ui/copyright'
import Container from '../components/ui/container'

export default function Admin() {
  return (
    <main className="flex flex-col h-[100vh] gap-10">
      <Header />
      <Container className="flex-grow flex items-start gap-6">
        <Sidebar />
        <Outlet />
      </Container>
      <Copyright />
    </main>
  )
}
