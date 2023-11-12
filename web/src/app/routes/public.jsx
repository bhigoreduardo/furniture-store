import Layout from '../layouts/public'
import DashboardLayout from '../layouts/public/dashboard'

import Maintenance from '../pages/public/maintenance'
import Auth from '../pages/public/auth'
import SignUpConfirm from '../pages/public/auth/sign-up-confirm'
import ActivatedToken from '../pages/public/auth/activated-token'
import GenerateRecoveryPassword from '../pages/public/auth/generate-recovery-password'
import RecoveryPassword from '../pages/public/auth/recovery-password'
import Tracker from '../pages/public/tracker'

import Dashboard from '../pages/public/dashboard'
import Setting from '../pages/public/dashboard/setting'

const router = [
  {
    path: '/manutencao',
    element: <Maintenance />,
  },
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
        path: '/rastrear',
        element: <Tracker />,
      },
      {
        path: '/conta',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
          {
            path: 'configuracao',
            element: <Setting />,
          },
        ],
      },
    ],
  },
]

export default router
