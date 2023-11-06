import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { put } from '../../../../../../libs/fetcher'
import useUser from '../../../../../../hooks/use-user'
import useApp from '../../../../../../hooks/use-app'
import Button from '../../../button/button'
import InputLabel from '../../../input/input-label'

const validationSchema = yup.object().shape({
  address: yup
    .object({
      street: yup.string().required('Rua é obrigatório'),
      neighborhood: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      state: yup
        .string()
        .max(2, 'Informe somente a UF. Ex.: MT')
        .required('Estado é obrigatório'),
      number: yup.string().optional(),
      zipCode: yup.string().required('CEP é obrigatório'),
      complement: yup.string().optional(),
    })
    .required('Endereço é obrigatório'),
})
const initialValues = {
  address: {
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    zipCode: '',
    complement: '',
  },
}

export default function FormAddress() {
  const { user, handleUpdateUser } = useUser()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user?.address ? { address: user.address } : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const { success, message, user, token } = await put(
      '/customers/update',
      validationSchema.cast(values, { stripUnknown: true })
    )
    setIsLoading(false)
    if (success) {
      toast.success(message)
      handleUpdateUser(user, token)
    } else {
      toast.error(message)
    }
  }

  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputLabel
            id="address.street"
            label="Rua"
            placeholder="Infome nome da rua"
            name="address.street"
            error={
              formik.touched?.address?.street && formik.errors?.address?.street
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.street}
            className="flex-grow"
          />
          <InputLabel
            id="address.neighborhood"
            label="Bairro"
            placeholder="Infome nome do bairro"
            name="address.neighborhood"
            error={
              formik.touched?.address?.neighborhood &&
              formik.errors?.address?.neighborhood
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.neighborhood}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="address.city"
            label="Cidade"
            placeholder="Infome nome da cidade"
            name="address.city"
            error={
              formik.touched?.address?.city && formik.errors?.address?.city
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.city}
            className="flex-grow"
          />
          <InputLabel
            id="address.state"
            label="Estado"
            placeholder="Infome nome do estado"
            name="address.state"
            error={
              formik.touched?.address?.state && formik.errors?.address?.state
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.state}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="address.number"
            label="Número"
            placeholder="Infome o número"
            name="address.number"
            error={
              formik.touched?.address?.number && formik.errors?.address?.number
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.number}
            className="flex-grow"
          />
          <InputLabel
            id="address.zipCode"
            label="CEP"
            placeholder="Infome o CEP"
            name="address.zipCode"
            error={
              formik.touched?.address?.zipCode &&
              formik.errors?.address?.zipCode
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.zipCode}
            className="flex-grow"
          />
          <InputLabel
            id="address.complement"
            label="Complemento"
            placeholder="Infome o complemento"
            name="address.complement"
            error={
              formik.touched?.address?.complement &&
              formik.errors?.address?.complement
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.address?.complement}
            className="flex-grow"
          />
        </div>
      </div>
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
