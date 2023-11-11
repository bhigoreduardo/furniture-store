/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { zipCodeMask } from '../../../../utils/mask'
import { removeDataMask } from '../../../../utils/format'
import { put } from '../../../../libs/fetcher'
import useApp from '../../../../hooks/use-app'
import useUser from '../../../../hooks/use-user'
import InputLabel from '../input/input-label'
import Button from '../button/button'

const validationSchema = yup.object().shape({
  street: yup.string().required('Rua é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatório'),
  state: yup
    .string()
    .max(2, 'Informe somente a UF. Ex.: SP')
    .required('Estado é obrigatório'),
  number: yup.string().optional(),
  zipCode: yup.string().required('CEP é obrigatório'),
  complement: yup.string().optional(),
})
const initialValues = {
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  number: '',
  zipCode: '',
  complement: '',
}

export default function FormAddress({ user, isAdmin = false, endPoint }) {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const { handleUpdateUser } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user?.address ? user.address : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    validationSchema.cast(values, { stripUnknown: true })
    const {
      user: userData,
      token,
      success,
    } = await put(
      endPoint,
      { address: removeDataMask(values, ['zipCode']) },
      setIsLoading,
      toast
    )
    if (!isAdmin) handleUpdateUser(userData, token)
    if (isAdmin && success) {
      setRefetch(true)
      navigate(-1)
    }
  }

  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputLabel
            id="street"
            label="Rua"
            placeholder="Infome nome da rua"
            name="street"
            error={formik.touched?.street && formik.errors?.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.street}
            className="flex-grow"
          />
          <InputLabel
            id="neighborhood"
            label="Bairro"
            placeholder="Infome nome do bairro"
            name="neighborhood"
            error={formik.touched?.neighborhood && formik.errors?.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.neighborhood}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="city"
            label="Cidade"
            placeholder="Infome nome da cidade"
            name="city"
            error={formik.touched?.city && formik.errors?.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.city}
            className="flex-grow"
          />
          <InputLabel
            id="state"
            label="Estado"
            placeholder="Infome nome do estado"
            name="state"
            error={formik.touched?.state && formik.errors?.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.state}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="number"
            label="Número"
            placeholder="Infome o número"
            name="number"
            error={formik.touched?.number && formik.errors?.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.number}
            className="flex-grow"
          />
          <InputLabel
            id="zipCode"
            label="CEP"
            placeholder="Infome o CEP"
            name="zipCode"
            error={formik.touched?.zipCode && formik.errors?.zipCode}
            onChange={(e) =>
              formik.setFieldValue('zipCode', zipCodeMask(e.target.value))
            }
            onBlur={formik.handleBlur}
            value={zipCodeMask(formik.values?.zipCode)}
            className="flex-grow"
          />
          <InputLabel
            id="complement"
            label="Complemento"
            placeholder="Infome o complemento"
            name="complement"
            error={formik.touched?.complement && formik.errors?.complement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.complement}
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
