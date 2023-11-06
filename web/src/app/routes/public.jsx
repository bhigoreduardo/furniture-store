import Layout from '../layouts/public'
import DashboardLayout from '../layouts/public/dashboard'

import Auth from '../pages/public/auth'
import SignUpConfirm from '../pages/public/auth/sign-up-confirm'
import ActivatedToken from '../pages/public/auth/activated-token'
import GenerateRecoveryPassword from '../pages/public/auth/generate-recovery-password'
import RecoveryPassword from '../pages/public/auth/recovery-password'

import Dashboard from '../pages/public/dashboard'

const router = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/entrar',
        element: <Auth />,
      },
      {
        path: '/confirmar-conta',
        element: <SignUpConfirm />,
      },
      {
        path: '/ativar-conta',
        element: <ActivatedToken />,
      },
      {
        path: '/recuperar-senha',
        element: <GenerateRecoveryPassword />,
      },
      {
        path: '/redefinir-senha',
        element: <RecoveryPassword />,
      },
      {
        path: '/conta',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]

export default router
