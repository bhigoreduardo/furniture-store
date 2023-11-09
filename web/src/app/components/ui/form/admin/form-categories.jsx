/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { formDataUpload, parsedSelectData } from '../../../../../utils/format'
import { useCategories } from '../../../../../hooks/use-category'
import { post, put } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import FileLabel from '../../input/file-label'
import InputLabel from '../../input/input-label'
import SelectLabel from '../../input/select-label'
import TextAreaLabel from '../../input/textarea-label'

const validationSchema = yup.object().shape({
  image: yup.string().required('Imagem é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  parent: yup.string().optional(),
  description: yup.string().optional(),
})
const initialValues = {
  image: '',
  name: '',
  parent: '',
  description: '',
}

export default function FormCategories({ data }) {
  const { setIsLoading } = useApp()
  const categories = useCategories()
  const parsedData = categories && parsedSelectData(categories, '_id', 'name')
  const parsedCategories = data
    ? parsedData?.filter((item) => item.value !== data._id)
    : parsedData
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data
      ? { ...data, parent: data?.parent || '' }
      : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    if (typeof values.image !== 'string') values = formDataUpload(values)
    if (data)
      await put(
        `/categories/${data._id}`,
        validationSchema.cast(values, { stripUnknown: true }),
        setIsLoading,
        toast
      )
    else await post('/categories/', values, setIsLoading, toast)
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
            placeholder="Infome nome da categoria"
            name="name"
            error={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="flex-grow"
          />
          {parsedCategories?.length > 0 && (
            <SelectLabel
              id="parent"
              label="Categoria herdeira"
              name="parent"
              placeholder="Selecione"
              data={parsedCategories}
              error={formik.touched.parent && formik.errors.parent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parent}
              className="flex-grow"
            />
          )}
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
