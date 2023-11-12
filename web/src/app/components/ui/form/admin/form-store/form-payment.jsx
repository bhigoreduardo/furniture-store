/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react'
import { XCircle } from 'phosphor-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { paymentColumns } from '../../../../../../utils/constants/admin'
import InputLabel from '../../../input/input-label'
import CheckboxToggleLabel from '../../../input/checkboxtoggle-label'
import FileLabel from '../../../input/file-label'
import Button from '../../../button/button'
import TableData from '../../../table/table-data'
import Badge from '../../../badge'

const validationInstallmentsSchema = yup.object().shape({
  installments: yup.number().required('Quantidade da parcela é obrigatório'),
  fee: yup.number().required('Taxa da parcela é obrigatório'),
})
const validationPaymentSchema = yup.object().shape({
  image: yup.string().required('Imagem é obrigatório'),
  method: yup.string().required('Método é obrigatório'),
  availableInstallments: yup.bool().required('Parcelas é obrigatório'),
  infoInstallments: yup.array().of(validationInstallmentsSchema).optional(),
})
const validationSchema = yup.object().shape({
  paymentMethod: yup
    .array()
    .of(validationPaymentSchema)
    .min(1, 'Pelo menos 1 forma de pagamento deve ser adicionado'),
})
const initialPaymentValues = {
  image: '',
  method: '',
  availableInstallments: false,
  infoInstallments: [],
}

export default function FormPayment() {
  const [indexEdit, setIndexEdit] = useState(null)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { paymentMethod: [] },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const paymentFormik = useFormik({
    enableReinitialize: true,
    initialValues: initialPaymentValues,
    validationSchema: validationPaymentSchema,
    onSubmit: (values) => {
      const curValues = formik?.values?.paymentMethod
      if (indexEdit === null) {
        formik.setFieldValue('paymentMethod', [...curValues, values])
      } else {
        curValues[indexEdit] = values
        formik.setFieldValue('paymentMethod', [...curValues])
        setIndexEdit(null)
      }
      paymentFormik.resetForm()
    },
  })
  const installmentsFormik = useFormik({
    enableReinitialize: true,
    initialValues: { installments: '', fee: '' },
    validationSchema: validationInstallmentsSchema,
    onSubmit: (values) => {
      paymentFormik.setFieldValue('infoInstallments', [
        ...paymentFormik?.values?.infoInstallments,
        values,
      ])
      installmentsFormik.resetForm()
    },
  })
  const handleSubmit = async (values) => console.log(values)
  const handleEdit = (index) => {
    const values = formik?.values?.paymentMethod[index]
    paymentFormik.setFieldValue('image', values.image)
    paymentFormik.setFieldValue('method', values.method)
    paymentFormik.setFieldValue(
      'availableInstallments',
      values.availableInstallments
    )
    paymentFormik.setFieldValue('infoInstallments', values.infoInstallments)
    setIndexEdit(index)
  }
  const handleDelete = (index) =>
    formik.setFieldValue('paymentMethod', [
      ...formik?.values?.paymentMethod?.filter((_, i) => i !== index),
    ])
  const handleRemove = (index) =>
    paymentFormik.setFieldValue('infoInstallments', [
      ...paymentFormik?.values?.infoInstallments.filter((_, i) => i !== index),
    ])

  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FileLabel
            id="image"
            label="Imagem"
            name="image"
            info="800*800"
            error={paymentFormik.touched.image && paymentFormik.errors.image}
            onChange={(e) =>
              paymentFormik.setFieldValue('image', e.target.files[0])
            }
            onBlur={paymentFormik.handleBlur}
            value={paymentFormik.values.image}
            onClear={() => paymentFormik.setFieldValue('image', '')}
          />
          <div className="flex-grow flex flex-col gap-4">
            <div className="flex gap-4">
              <InputLabel
                id="method"
                label="Método"
                placeholder="Infome método"
                name="method"
                error={
                  paymentFormik.touched?.method && paymentFormik.errors?.method
                }
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                value={paymentFormik.values?.method}
                className="flex-grow"
              />
              <CheckboxToggleLabel
                id="availableInstallments"
                name="availableInstallments"
                label="Aceita parcela"
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.availableInstallments}
                checked={paymentFormik.values.availableInstallments}
                className="flex-grow"
              />
            </div>
            {paymentFormik.values.availableInstallments && (
              <div className="flex flex-col gap-4">
                <div className="flex-grow flex-1 flex gap-4">
                  <InputLabel
                    id="installments"
                    label="Parcela"
                    placeholder="Infome a parcela"
                    name="installments"
                    error={
                      installmentsFormik.touched?.installments &&
                      installmentsFormik.errors?.installments
                    }
                    onChange={installmentsFormik.handleChange}
                    onBlur={installmentsFormik.handleBlur}
                    value={installmentsFormik.values?.installments}
                    className="flex-grow"
                  />
                  <InputLabel
                    id="fee"
                    label="Taxa"
                    placeholder="Infome a taxa ao mês"
                    name="fee"
                    error={
                      installmentsFormik.touched?.fee &&
                      installmentsFormik.errors?.fee
                    }
                    onChange={installmentsFormik.handleChange}
                    onBlur={installmentsFormik.handleBlur}
                    value={installmentsFormik.values?.fee}
                    className="flex-grow"
                  />
                  <Button
                    label="Adicionar"
                    onClick={installmentsFormik.handleSubmit}
                    className="bg-orange-500 text-white hover:bg-orange-600 !py-2 h-[37.6px] mt-7"
                  />
                </div>
                <div className="flex flex-wrap justify-start gap-1">
                  {paymentFormik?.values?.infoInstallments?.length > 0 &&
                    paymentFormik?.values?.infoInstallments.map((item, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleRemove(i)}
                        className="group relative"
                      >
                        <Badge
                          content={
                            <span>
                              {item.installments}x{' '}
                              {Number(item.fee) !== 0
                                ? `+ ${item.fee}%a.m.`
                                : 'sem juros'}
                            </span>
                          }
                          className="bg-gray-200"
                        />
                        <Badge
                          content={<XCircle size={20} />}
                          className="w-full hidden group-hover:inline-flex justify-center text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-40"
                        />
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={paymentFormik.handleSubmit}
          label={indexEdit !== null ? 'Salvar' : 'Adicionar'}
          className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
        {formik.touched?.paymentMethod && formik.errors?.paymentMethod && (
          <span className="text-xs text-red-500">
            {formik.errors?.paymentMethod}
          </span>
        )}
        <TableData
          columns={paymentColumns(handleEdit, handleDelete)}
          data={formik.values?.paymentMethod}
          className="!p-0"
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
