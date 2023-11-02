/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { post, put } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import InputLabel from '../../input/input-label'
import TextAreaLabel from '../../input/textarea-label'
import ColorLabel from '../../input/color-label'

const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  color: yup.string().required('Cor é obrigatório'),
  description: yup.string().optional(),
})
const initialValues = {
  name: '',
  color: '',
  description: '',
}

export default function FormColors({ data }) {
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data || initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    let response
    if (data)
      response = await put(
        `/colors/${data._id}`,
        validationSchema.cast(values, { stripUnknown: true })
      )
    else response = await post('/colors/', values)

    setIsLoading(false)
    if (response?.success) {
      toast.success(response?.message)
      navigate(-1)
    } else {
      toast.error(response?.message)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputLabel
            id="name"
            label="Nome"
            placeholder="Infome nome da cor"
            name="name"
            error={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="flex-grow"
          />
          <ColorLabel
            id="color"
            type="color"
            label="Cor"
            name="color"
            error={formik.touched.color && formik.errors.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
            className="flex-grow"
          />
        </div>
        <TextAreaLabel
          id="description"
          label="Descrição"
          name="description"
          placeholder="Informe a descrição da cor"
          error={formik.touched.description && formik.errors.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
