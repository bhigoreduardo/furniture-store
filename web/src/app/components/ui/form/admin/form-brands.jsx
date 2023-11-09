/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { formDataUpload } from '../../../../../utils/format'
import { post, put } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import FileLabel from '../../input/file-label'
import InputLabel from '../../input/input-label'
import TextAreaLabel from '../../input/textarea-label'

const validationSchema = yup.object().shape({
  image: yup.string().required('Imagem é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().optional(),
})
const initialValues = {
  image: '',
  name: '',
  description: '',
}

export default function FormBrands({ data }) {
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data || initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    if (typeof values.image !== 'string') values = formDataUpload(values)
    if (data)
      await put(
        `/brands/${data._id}`,
        validationSchema.cast(values, { stripUnknown: true }),
        setIsLoading,
        toast
      )
    else await post('/brands/', values, setIsLoading, toast)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FileLabel
            id="image"
            label="Imagem"
            name="image"
            info="800*800"
            error={formik.touched.image && formik.errors.image}
            onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            onClear={() => formik.setFieldValue('image', '')}
          />
          <InputLabel
            id="name"
            label="Nome"
            placeholder="Infome nome da marca"
            name="name"
            error={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="flex-grow"
          />
        </div>
        <TextAreaLabel
          id="description"
          label="Descrição"
          name="description"
          placeholder="Informe a descrição da categoria"
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
