import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'phosphor-react'

import { post } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import InputLabel from '../../input/input-label'
import Button from '../../button/button'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
})
const initialValues = { email: '' }

export default function FormActivatedToken() {
  const { setIsLoading } = useApp()
  const [info, setInfo] = useState('')
  const [success, setSuccess] = useState(false)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const { message, info, success } = await post(
      '/customers/activated-token',
      values
    )
    setIsLoading(false)
    setInfo(info)
    setSuccess(success)
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
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
            Não ativou sua conta ainda?
          </h4>

          <p className="text-sm text-gray-600 text-center">
            Informe seu endereço de email cadastrada na Furniture eCommerce.
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
        <Button
          type="submit"
          label="Ativar conta"
          icon={<ArrowRight size={20} className="text-white" />}
          className="bg-orange-500 text-white hover:bg-orange-600"
        />
        <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
          <span className="flex gap-[6px] text-sm text-gray-600">
            Não possui uma conta?
            <Link to="/entrar" className="text-blue-500">
              Cadastrar
            </Link>
          </span>
        </div>
        <span className="text-sm text-gray-600">
          Você pode entrar em contato com o{' '}
          <Link className="text-orange-500">Atendimento</Link> ao Cliente para
          obter ajuda para ativar o acesso à sua conta.
        </span>
      </div>
    </form>
  )
}
