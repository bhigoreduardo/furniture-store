/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useFormik } from 'formik'
import { CheckCircle, PlusCircle } from 'phosphor-react'

import { initialOtherInfosValues, validationOtherInfosSchema } from '.'
import { infoProductColumns } from '../../../../../../utils/constants/admin'
import Button from '../../../button/button'
import Heading from '../../../heading'
import FormWrapper from '../form-wrapper'
import InputLabel from '../../../input/input-label'
import TextRichLabel from '../../../input/textrich-label'
import TableData from '../../../table/table-data'

export default function FormSpecification(props) {
  const [indexEdit, setIndexEdit] = useState(null)
  const formik = useFormik({
    initialValues: initialOtherInfosValues,
    validationSchema: validationOtherInfosSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const curValues = props.formik?.values?.specification
    if (indexEdit === null) {
      props.formik.setFieldValue('specification', [...curValues, values])
    } else {
      curValues[indexEdit] = values
      props.formik.setFieldValue('specification', [...curValues])
      setIndexEdit(null)
    }
    formik.resetForm()
  }
  const handleClear = () => formik.resetForm()
  const handleEdit = (index) => {
    const values = props.formik?.values?.specification[index]
    formik.setFieldValue('title', values.title)
    formik.setFieldValue('description', values.description)
    setIndexEdit(index)
  }
  const handleDelete = (index) => {
    props.formik.setFieldValue('specification', [
      ...props.formik?.values?.specification.filter((_, i) => i !== index),
    ])
    formik.resetForm()
    setIndexEdit(null)
  }
  return (
    <FormWrapper title="Especificações" handleClear={handleClear}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Heading
            title="Detalhe"
            btn={
              <Button
                onClick={formik.handleSubmit}
                label={indexEdit !== null ? 'Salvar' : 'Adicionar'}
                icon={
                  indexEdit !== null ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <PlusCircle size={16} className="text-white" />
                  )
                }
                className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
              />
            }
            className="!normal-case !px-0"
          />
          <InputLabel
            id="title"
            placeholder="Infome título da informação"
            name="title"
            error={formik.touched.title && formik.errors.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="flex-grow"
          />
          <TextRichLabel
            id="description"
            placeholder="Informe a descrição"
            onChange={(value) => formik.setFieldValue('description', value)}
            value={formik.values.description}
            error={formik.touched.description && formik.errors.description}
            onBlur={formik.handleBlur}
            className="mb-6"
          />
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
          {props.formik.touched?.specification &&
            props.formik.errors?.specification && (
              <span className="text-xs text-red-500">
                {props.formik.errors?.specification}
              </span>
            )}
          <TableData
            columns={infoProductColumns(handleEdit, handleDelete)}
            data={props.formik.values?.specification}
            className="!p-0"
          />
        </div>
      </div>
    </FormWrapper>
  )
}
