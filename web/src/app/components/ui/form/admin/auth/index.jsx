import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { ArrowRight } from 'phosphor-react'

import { post } from '../../../../../../libs/fetcher'
import { findUserTypePath } from '../../../../../../utils/helper'
import useApp from '../../../../../../hooks/use-app'
import InputLabel from '../../../input/input-label'
import PasswordLabel from '../../../input/password-label'
import Button from '../../../button/button'
import useUser from '../../../../../../hooks/use-user'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
})
const initialnValues = {
  email: '',
  password: '',
}
export default function FormAuth() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { setIsLoading } = useApp()
  const { handleUpdateUser } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialnValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const path = pathname.split('/')
  path.pop()
  const handleSubmit = async (values) => {
    const _type = findUserTypePath(path[2])
    const { success, user, token } = await post(
      '/auth/sign-in',
      { _type, ...values },
      setIsLoading,
      toast
    )
    if (success) {
      handleUpdateUser(user, token)
      navigate(path.join('/'))
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[450px] border border-gray-100 bg-white rounded-sm shadow-md"
    >
      <div className="flex flex-col gap-4 px-8 py-6">
        <InputLabel
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          error={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <PasswordLabel
          id="password"
          label="Senha"
          placeholder="Senha"
          name="password"
          btn={
            <Link
              to={`${path.join('/')}/recuperar-senha`}
              className="font-semibold text-blue-500 hover:text-blue-600"
            >
              Esqueceu a senha?
            </Link>
          }
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Button
          type="submit"
          label="Entrar"
          icon={<ArrowRight size={20} className="text-white" />}
          className="bg-orange-500 text-white hover:bg-orange-600"
        />
      </div>
    </form>
  )
}
