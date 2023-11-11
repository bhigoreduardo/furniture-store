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

export default function FormAdditional(props) {
  const [indexEdit, setIndexEdit] = useState(null)
  const formik = useFormik({
    initialValues: initialOtherInfosValues,
    validationSchema: validationOtherInfosSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const curValues = props.formik?.values?.additional?.otherInfos
    if (indexEdit === null) {
      props.formik.setFieldValue('additional.otherInfos', [
        ...curValues,
        values,
      ])
    } else {
      curValues[indexEdit] = values
      props.formik.setFieldValue('additional.otherInfos', [...curValues])
      setIndexEdit(null)
    }
    formik.resetForm()
  }
  const handleClear = () => {
    props.formik.setFieldValue('additional.detail', '')
    formik.resetForm()
  }
  const handleEdit = (index) => {
    const values = props.formik?.values?.additional?.otherInfos[index]
    formik.setFieldValue('title', values.title)
    formik.setFieldValue('description', values.description)
    setIndexEdit(index)
  }
  const handleDelete = (index) => {
    props.formik.setFieldValue('additional.otherInfos', [
      ...props.formik?.values?.additional?.otherInfos.filter(
        (_, i) => i !== index
      ),
    ])
    formik.resetForm()
    setIndexEdit(null)
  }
  return (
    <FormWrapper title="Informações adicionais" handleClear={handleClear}>
      <div className="flex flex-col gap-6">
        <TextRichLabel
          id="additional.detail"
          label="Detalhe"
          placeholder="Informe a descrição"
          onChange={(value) =>
            props.formik.setFieldValue('additional.detail', value)
          }
          value={props.formik.values?.additional?.detail}
          error={
            props.formik.touched?.additional?.detail &&
            props.formik.errors?.additional?.detail
          }
          className="mb-6"
        />
        <div className="flex flex-col">
          <Heading
            title="Outras informações"
            btn={
              <Button
                label={indexEdit !== null ? 'Salvar' : 'Adicionar'}
                icon={
                  indexEdit !== null ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <PlusCircle size={16} className="text-white" />
                  )
                }
                onClick={formik.handleSubmit}
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
            className="mb-6"
          />
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
          <TableData
            columns={infoProductColumns(handleEdit, handleDelete)}
            data={props.formik.values?.additional?.otherInfos}
            className="!p-0"
          />
        </div>
      </div>
    </FormWrapper>
  )
}
