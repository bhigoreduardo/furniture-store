/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { ArrowRight } from 'phosphor-react'
import * as yup from 'yup'

import { get } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import InputLabel from '../../input/input-label'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  code: yup
    .string()
    .length(8, 'Número do pedido possui 8 caracteres')
    .required('Número do pedido é obrigatório'),
})
const initialValues = {
  email: '',
  code: '',
}

export default function FormTracker({ setData }) {
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const data = await get(
      `/customers/search/orders/${values.code}?email=${values.email}`,
      setIsLoading,
      toast
    )
    setData(data)
  }
  return (
    <form
      className="w-full flex flex-col gap-6 px-8 py-6 max-w-[800px]"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-3xl text-gray-900">
          Rastrear pedido
        </h4>

        <p className="text-sm text-gray-600">
          Informe código do pedido junto com seu endereço de email cadastrada na
          Furniture eCommerce.
        </p>
      </div>

      <div className="flex gap-4">
        <InputLabel
          id="code"
          label="Número do pedido"
          placeholder="Informe o número do pedido"
          name="code"
          hint="Número do pedido foi enviado para seu email durante a compra"
          error={formik.touched.code && formik.errors.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          className="flex-grow"
        />
        <InputLabel
          id="email"
          label="Email"
          type="email"
          placeholder="Insira seu email"
          name="email"
          error={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="flex-grow"
        />
      </div>

      <Button
        type="submit"
        label="Rastrear"
        icon={<ArrowRight size={20} className="text-white" />}
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit"
      />
    </form>
  )
}
