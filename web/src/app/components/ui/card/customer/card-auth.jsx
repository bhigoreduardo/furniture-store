/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'phosphor-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { post } from '../../../../../libs/fetcher'
import { mergeClassName } from '../../../../../utils/format'
import { UserEnum } from '../../../../../types/user-type'
import useApp from '../../../../../hooks/use-app'
import useUser from '../../../../../hooks/use-user'
import InputLabel from '../../input/input-label'
import PasswordLabel from '../../input/password-label'
import Button from '../../button/button'

const validationSchema = yup.object().shape({
  _type: yup.string().required('Usuário tipo é obrigatório'),
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
})
const initialValues = {
  _type: UserEnum.Customer,
  email: '',
  password: '',
}

export default function CardAuth({ setIsCardAuth, className }) {
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const { handleUpdateUser } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const { success, user, token } = await post(
      '/auth/sign-in',
      values,
      setIsLoading,
      toast,
      null
    )
    if (success) {
      handleUpdateUser(user, token)
      formik.resetForm()
      setIsCardAuth(false)
      navigate('/conta')
    }
  }
  return (
    <form
      className={mergeClassName(
        'w-full max-w-[400px] border border-gray-100 bg-white rounded-sm shadow-md py-6 px-6',
        className
      )}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <h4 className="font-semibold text-xl text-gray-900 text-center">
          Acessar conta
        </h4>
        <div className="flex flex-col gap-4">
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
                to="/recuperar-senha"
                onClick={() => setIsCardAuth(false)}
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
        </div>
        <Button
          type="submit"
          label="Entrar"
          icon={<ArrowRight size={20} className="text-white" />}
          className="bg-orange-500 text-white hover:bg-orange-600"
        />
        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-600">Não possui uma conta?</span>
          <Button
            label="Criar"
            onClick={() => {
              navigate('/entrar')
              setIsCardAuth(false)
            }}
            className="text-orange-500 !border-orange-200 hover:bg-orange-600 hover:text-white"
          />
        </div>
      </div>
    </form>
  )
}
