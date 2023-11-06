/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { PlusCircle } from 'phosphor-react'

import { initialOtherInfosValues, validationOtherInfosSchema } from '.'
import { infoProductColumns } from '../../../../../../utils/constants/admin'
import Button from '../../../button/button'
import Heading from '../../../heading'
import FormWrapper from '../form-wrapper'
import InputLabel from '../../../input/input-label'
import TextRichLabel from '../../../input/textrich-label'
import TableData from '../../../table/table-data'

export default function FormSpecification(props) {
  const formik = useFormik({
    initialValues: initialOtherInfosValues,
    validationSchema: validationOtherInfosSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    props.formik.setFieldValue('specification', [
      ...props.formik?.values?.specification,
      values,
    ])
    formik.resetForm()
  }
  const handleClear = () => formik.resetForm()
  return (
    <FormWrapper title="Especificações" handleClear={handleClear}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Heading
            title="Detalhe"
            btn={
              <Button
                onClick={formik.handleSubmit}
                label="Adicionar"
                icon={<PlusCircle size={16} className="text-white" />}
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
          <TableData
            columns={infoProductColumns}
            data={props.formik.values?.specification}
            className="!p-0"
          />
        </div>
      </div>
    </FormWrapper>
  )
}
