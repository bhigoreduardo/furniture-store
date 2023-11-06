/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '../../../button/button'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import Badge from '../../../badge'
import { XCircle } from 'phosphor-react'

export default function FormTag(props) {
  const formik = useFormik({
    initialValues: { title: '' },
    validationSchema: yup
      .object()
      .shape({ title: yup.string().required('Tag é obrigatório') }),
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = (values) => {
    props.formik.setFieldValue('tags', [
      ...props.formik?.values?.tags,
      values.title,
    ])
    formik.resetForm()
  }
  const handleClear = () => {
    props.formik.setFieldValue('tags', [])
  }
  const handleRemove = (index) =>
    props.formik.setFieldValue('tags', [
      ...props.formik.values.tags.filter((_, i) => i !== index),
    ])
  return (
    <FormWrapper title="Tags" handleClear={handleClear}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <InputLabel
            id="title"
            placeholder="Informe a tag"
            name="title"
            error={formik.touched.title && formik.errors.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="flex-grow"
          />
          <Button
            label="Adicionar"
            onClick={formik.handleSubmit}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2 h-[37.6px]"
          />
        </div>
        <div className="flex flex-wrap justify-start gap-1">
          {props.formik.values.tags?.length > 0 &&
            props.formik.values.tags.map((item, i) => (
              <button
                type="button"
                key={i}
                onClick={() => handleRemove(i)}
                className="group relative"
              >
                <Badge content={item} className="bg-gray-200" />
                <Badge
                  content={<XCircle size={20} />}
                  className="w-full hidden group-hover:inline-flex justify-center text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-40"
                />
              </button>
            ))}
        </div>
      </div>
    </FormWrapper>
  )
}
