import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useApp from '../hooks/use-app'
import LoaderContainer from './components/ui/loader-container'
import Public from './layouts/public'
import PublicAuth from './pages/public/auth'
import PublicGenerateRecoveryPassword from './pages/public/generate-recovery-password'
import SignUpConfirm from './pages/public/sign-up-confirm'
import ActivatedToken from './pages/public/activated-token'
import PublicRecoveryPassword from './pages/public/recovery-password'

import AdminAuth from './pages/admin/auth'
import SignUp from './pages/admin/auth/sign-up'
import AdminGenerateRecoveryPassword from './pages/admin/auth/generate-recovery-password'
import AdminRecoveryPassword from './pages/admin/auth/recovery-password'
import Admin from './layouts/admin'
import Dashboard from './pages/admin/dashboard'
import Categories from './pages/admin/categories'
import CategoriesForm from './pages/admin/categories/form'

export default function App() {
  const { isLoading } = useApp()

  return (
    <>
      {isLoading && <LoaderContainer />}
      <Router>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="entrar" element={<PublicAuth />} />
            <Route path="confirmar-conta" element={<SignUpConfirm />} />
            <Route path="ativar-conta" element={<ActivatedToken />} />
            <Route
              path="recuperar-senha"
              element={<PublicGenerateRecoveryPassword />}
            />
            <Route
              path="redefinir-senha"
              element={<PublicRecoveryPassword />}
            />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="categorias" element={<Categories />} />
            <Route path="categorias/cadastrar" element={<CategoriesForm />} />
            <Route path="categorias/editar/:id" element={<CategoriesForm />} />
          </Route>
          <Route path="/admin/cadastrar" element={<SignUp />} />
          <Route path="/admin/entrar" element={<AdminAuth />} />
          <Route
            path="/admin/recuperar-senha"
            element={<AdminGenerateRecoveryPassword />}
          />
          <Route
            path="/admin/redefinir-senha"
            element={<AdminRecoveryPassword />}
          />

          <Route path="/loja/entrar" element={<AdminAuth />} />
          <Route
            path="/loja/recuperar-senha"
            element={<AdminGenerateRecoveryPassword />}
          />
          <Route
            path="/loja/redefinir-senha"
            element={<AdminRecoveryPassword />}
          />
        </Routes>
      </Router>
    </>
  )
}
