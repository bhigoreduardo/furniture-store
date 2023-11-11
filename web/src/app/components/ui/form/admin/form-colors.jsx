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

export default function FormColors({ data }) {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      color: data?.color || '',
      description: data?.description || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    let response
    validationSchema.cast(values, { stripUnknown: true })
    if (Object.keys(data)?.length !== 0)
      response = await put(`/colors/${data._id}`, values, setIsLoading, toast)
    else response = await post('/colors/', values, setIsLoading, toast)
    if (response?.success) {
      setRefetch(true)
      navigate(-1)
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
