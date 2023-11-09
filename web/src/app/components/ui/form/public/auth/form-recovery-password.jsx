import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ArrowRight } from 'phosphor-react'
import { toast } from 'react-toastify'

import { post } from '../../../../../../libs/fetcher'
import useApp from '../../../../../../hooks/use-app'
import useQueries from '../../../../../../hooks/use-queries'
import PasswordLabel from '../../../input/password-label'
import Button from '../../../button/button'

const validationSchema = yup.object().shape({
  password: yup.string().required('Senha é obrigatório'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
    .required('Repetir senha é obrigatório'),
})
const initialValues = {
  password: '',
  repeatPassword: '',
}

export default function FormRecoveryPassword() {
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const queries = useQueries()
  const [info, setInfo] = useState('')
  const [success, setSuccess] = useState(false)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    if (queries.has('token')) {
      const { info, success } = await post(
        '/customers/recovery-password',
        {
          ...values,
          passwordResetToken: queries.get('token'),
        },
        setIsLoading,
        toast
      )
      setInfo(info)
      setSuccess(success)
      if (success) {
        navigate('/entrar')
      }
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[450px] border border-gray-100 bg-white rounded-sm shadow-md"
    >
      <div className="flex flex-col gap-6 px-8 py-6">
        <div className="flex flex-col gap-3 items-center">
          <h4 className="font-semibold text-base text-gray-900">
            Recuperar senha
          </h4>

          <p className="text-sm text-gray-600 text-center">
            Informe sua nova senha
          </p>
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
        <PasswordLabel
          id="password"
          label="Senha"
          placeholder="Senha com +6 caracteres"
          name="password"
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <PasswordLabel
          id="repeatPassword"
          label="Repetir senha"
          placeholder="Repetir senha"
          name="repeatPassword"
          error={formik.touched.repeatPassword && formik.errors.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
        />
        <Button
          type="submit"
          label="Redefinir senha"
          icon={<ArrowRight size={20} className="text-white" />}
          className="bg-orange-500 text-white hover:bg-orange-600"
        />
      </div>
    </form>
  )
}
