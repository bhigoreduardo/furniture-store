import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { post } from '../../../../../../libs/fetcher'
import useApp from '../../../../../../hooks/use-app'
import Button from '../../../button/button'
import FormInformation from './form-information'
import CheckboxToggleLabel from '../../../input/checkboxtoggle-label'
import FormSpecification from './form-specification'

const validationSchema = yup.object().shape({
  status: yup.bool().required('Status é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  complement: yup.string().optional(),
  discountType: yup.string().required('Tipo de desconto é obrigatório'),
  offerType: yup.string().required('Tipo de oferta é obrigatório'),
  offerValue: yup.number().required('Valor da oferta é obrigatório'),
  offerPriceDates: yup.array().optional(),
  usageLimit: yup.object({
    maxCart: yup.number().optional(),
    minCart: yup.number().optional(),
    maxCustomer: yup.number().optional(),
  }),
  everyOne: yup.bool().optional(),
  brand: yup.array().of(yup.string()).optional(),
  category: yup.array().of(yup.string()).optional(),
  product: yup.array().of(yup.string()).optional(),
})
const initialValues = {
  status: true,
  name: '',
  complement: '',
  discountType: '',
  offerType: '',
  offerValue: '',
  offerPriceDates: [null, null],
  usageLimit: {
    maxCart: 0,
    minCart: 0,
    maxCustomer: 0,
  },
  everyOne: true,
  brand: [],
  category: [],
  product: [],
}

export default function FormOffers() {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    validationSchema.cast(values, { stripUnknown: true })
    const { success } = await post(
      '/offers',
      values,
      setIsLoading,
      toast,
      setRefetch
    )
    if (success) navigate(-1)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 px-6">
      <CheckboxToggleLabel
        id="status"
        name="status"
        label="Ativo"
        error={formik.touched?.status && formik.errors?.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.status}
        checked={formik.values?.status}
      />
      <FormInformation formik={formik} />
      <FormSpecification formik={formik} />
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
