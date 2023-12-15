/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { offerProductColumns } from '../../../../../utils/constants/admin'
import { formDataUpload, parsedSelectData } from '../../../../../utils/format'
import { useCategories } from '../../../../../hooks/use-category'
import { post, put } from '../../../../../libs/fetcher'
import useFilter from '../../../../../hooks/use-filter'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import ImageLabel from '../../input/image-label'
import InputLabel from '../../input/input-label'
import SelectLabel from '../../input/select-label'
import TextAreaLabel from '../../input/textarea-label'
import FormProduct from './form-product'
import Heading from '../../heading'

const validationSchema = yup.object().shape({
  image: yup.string().required('Imagem é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  parent: yup.string().optional(),
  description: yup.string().optional(),
  product: yup.array().of(yup.string()).optional(),
})

export default function FormCategories({ data }) {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const { setCategory } = useFilter()
  const categories = useCategories()
  const parsedData = categories && parsedSelectData(categories, '_id', 'name')
  const parsedCategories = data
    ? parsedData?.filter((item) => item.value !== data._id)
    : parsedData
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: data?.image || '',
      name: data?.name || '',
      parent: data?.parent || '',
      description: data?.description || '',
      ...(Object.keys(data)?.length !== 0 && {
        product: data?.spotlights || [],
      }),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleDelete = (index) =>
    formik.setFieldValue('product', [
      ...formik?.values?.product?.filter((item) => item !== index),
    ])
  const handleSubmit = async (values) => {
    let response
    validationSchema.cast(values, { stripUnknown: true })
    if (typeof values.image !== 'string') values = formDataUpload(values)
    if (Object.keys(data)?.length !== 0)
      response = await put(
        `/categories/${data._id}`,
        values,
        setIsLoading,
        toast,
        setRefetch
      )
    else
      response = await post(
        '/categories/',
        values,
        setIsLoading,
        toast,
        setRefetch
      )
    if (response?.success) navigate(-1)
  }
  useEffect(() => {
    if (Object.keys(data)?.length !== 0) setCategory(data._id)
  }, [data, setCategory])

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <ImageLabel
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
      {Object.keys(data)?.length !== 0 && (
        <>
          <Heading title="Destaques" />
          <FormProduct
            formik={formik}
            columns={offerProductColumns(handleDelete)}
          />
        </>
      )}
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
