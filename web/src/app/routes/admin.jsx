import Layout from '../layouts/admin'

import Auth from '../pages/admin/auth'
import SignUp from '../pages/admin/auth/sign-up'
import GenerateRecoveryPassword from '../pages/admin/auth/generate-recovery-password'
import RecoveryPassword from '../pages/admin/auth/recovery-password'

import Dashboard from '../pages/admin/dashboard'
import Categories from '../pages/admin/categories'
import CategoriesForm from '../pages/admin/categories/form'
import Colors from '../pages/admin/colors'
import ColorsForm from '../pages/admin/colors/form'
import Brands from '../pages/admin/brands'
import BrandsForm from '../pages/admin/brands/form'
import Products from '../pages/admin/products'
import ProductsForm from '../pages/admin/products/form'

const children = [
  {
    path: 'entrar',
    element: <Auth />,
  },
  {
    path: 'recuperar-senha',
    element: <GenerateRecoveryPassword />,
  },
  {
    path: 'redefinir-senha',
    element: <RecoveryPassword />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'painel',
        element: <Dashboard />,
      },
      {
        path: 'categorias',
        children: [
          { path: '', element: <Categories /> },
          { path: 'cadastrar', element: <CategoriesForm /> },
          { path: 'editar/:id', element: <CategoriesForm /> },
        ],
      },
      {
        path: 'cores',
        children: [
          { path: '', element: <Colors /> },
          { path: 'cadastrar', element: <ColorsForm /> },
          { path: 'editar/:id', element: <ColorsForm /> },
        ],
      },
      {
        path: 'marcas',
        children: [
          { path: '', element: <Brands /> },
          { path: 'cadastrar', element: <BrandsForm /> },
          { path: 'editar/:id', element: <BrandsForm /> },
        ],
      },
      {
        path: 'produtos',
        children: [
          { path: '', element: <Products /> },
          { path: 'cadastrar', element: <ProductsForm /> },
          { path: 'editar/:id', element: <ProductsForm /> },
        ],
      },
    ],
  },
]

const router = [
  {
    path: '/admin',
    children: [
      ...children,
      {
        path: 'cadastrar',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/loja',
    children: children,
  },
]

export default router
