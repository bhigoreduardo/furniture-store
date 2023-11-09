import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'phosphor-react'

import { post } from '../../../../../../libs/fetcher'
import useUser from '../../../../../../hooks/use-user'
import useApp from '../../../../../../hooks/use-app'
import InputLabel from '../../../input/input-label'
import PasswordLabel from '../../../input/password-label'
import Button from '../../../button/button'
import Tab from '../../../button/tab'
import CheckboxLabel from '../../../input/checkbox-label'

const validationSignInSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
})
const initialSignInValues = {
  email: '',
  password: '',
}
const validationSignUpSchema = validationSignInSchema.shape({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  whatsApp: yup.string().required('Número de telefone é obrigatório'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
    .required('Repetir senha é obrigatório'),
  terms: yup.bool().required('Termos é obrigatório'),
})
const initialSignUpValues = {
  ...initialSignInValues,
  name: '',
  cpf: '',
  whatsApp: '',
  repeatPassword: '',
  terms: '',
}

export default function FormAuth() {
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const { handleUpdateUser } = useUser()
  const [info, setInfo] = useState('')
  const [success, setSuccess] = useState(false)
  const [isNonLogin, setIsNonLogin] = useState(false)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isNonLogin ? initialSignUpValues : initialSignInValues,
    validationSchema: isNonLogin
      ? validationSignUpSchema
      : validationSignInSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const endPoint = isNonLogin ? '/customers/sign-up' : '/customers/sign-in'
    const { info, success, user, token } = await post(
      endPoint,
      values,
      setIsLoading,
      toast
    )
    setInfo(info)
    setSuccess(success)
    if (success && !isNonLogin) {
      handleUpdateUser(user, token)
      navigate('/conta')
      formik.resetForm()
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[450px] border border-gray-100 bg-white rounded-sm shadow-md"
    >
      <div className="flex items-center justify-between border-b border-gray-100">
        <Tab
          label="Entrar"
          className="w-full"
          active={!isNonLogin}
          onClick={() => setIsNonLogin(false)}
        />
        <Tab
          label="Cadastrar"
          className="w-full"
          active={isNonLogin}
          onClick={() => setIsNonLogin(true)}
        />
      </div>
      {info && (
        <span
          className={`flex pt-2 justify-center text-xs ${
            success ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {info}
        </span>
      )}
      <div className="flex flex-col gap-4 px-8 py-6">
        {isNonLogin && (
          <>
            <InputLabel
              id="name"
              label="Nome"
              placeholder="Nome"
              name="name"
              error={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <InputLabel
              id="cpf"
              label="CPF"
              placeholder="CPF"
              name="cpf"
              error={formik.touched.cpf && formik.errors.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpf}
            />
          </>
        )}
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
        {isNonLogin && (
          <InputLabel
            id="whatsApp"
            label="WhatsApp"
            type="whatsApp"
            placeholder="WhatsApp"
            name="whatsApp"
            error={formik.touched.whatsApp && formik.errors.whatsApp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.whatsApp}
          />
        )}
        <PasswordLabel
          id="password"
          label="Senha"
          placeholder={isNonLogin ? 'Senha com +6 caracteres' : 'Senha'}
          name="password"
          btn={
            !isNonLogin && (
              <Link
                to="/recuperar-senha"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                Esqueceu a senha?
              </Link>
            )
          }
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {isNonLogin && (
          <>
            <PasswordLabel
              id="repeatPassword"
              label="Repetir senha"
              placeholder="Repetir senha"
              name="repeatPassword"
              error={
                formik.touched.repeatPassword && formik.errors.repeatPassword
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
            <CheckboxLabel
              name="terms"
              label={
                <span className="text-xs text-gray-600">
                  Aceito os{' '}
                  <Link className="text-blue-500">Termos de Condições</Link> e{' '}
                  <Link className="text-blue-500">Política de Privacidade</Link>
                </span>
              }
              error={formik.touched.terms && formik.errors.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.terms}
            />
          </>
        )}
        <Button
          type="submit"
          label={isNonLogin ? 'Cadastrar' : 'Entrar'}
          icon={<ArrowRight size={20} className="text-white" />}
          className="bg-orange-500 text-white hover:bg-orange-600"
        />
        {!isNonLogin && (
          <Link
            to="/ativar-conta"
            className="ml-auto font-semibold text-blue-500 hover:text-blue-600"
          >
            Ativar conta
          </Link>
        )}
      </div>
    </form>
  )
}
