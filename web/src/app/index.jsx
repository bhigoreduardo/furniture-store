import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useApp from '../hooks/useApp'
import LoaderContainer from './components/ui/loader-container'
import Public from './layouts/public'
import Auth from './pages/public/auth'
import GenerateRecoveryPassword from './pages/public/generate-recovery-password'
import SignUpConfirm from './pages/public/sign-up-confirm'
import ActivatedToken from './pages/public/activated-token'
import RecoveryPassword from './pages/public/recovery-password'

export default function App() {
  const { isLoading } = useApp()
  
  return (
    <>
      {isLoading && <LoaderContainer />}
      <Router>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="entrar" element={<Auth />} />
            <Route path="confirmar-conta" element={<SignUpConfirm />} />
            <Route path="ativar-conta" element={<ActivatedToken />} />
            <Route
              path="recuperar-senha"
              element={<GenerateRecoveryPassword />}
            />
            <Route path="redefinir-senha" element={<RecoveryPassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
