/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react'
import { XCircle } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { paymentColumns } from '../../../../../../utils/constants/admin'
import { del, post, put } from '../../../../../../libs/fetcher'
import { formDataUpload, typeOfString } from '../../../../../../utils/format'
import { usePayments } from '../../../../../../hooks/use-payment'
import useApp from '../../../../../../hooks/use-app'
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
const validationSchema = yup.object().shape({
  image: yup.string().required('Imagem é obrigatório'),
  method: yup.string().required('Método é obrigatório'),
  availableInstallments: yup.bool().required('Parcelas é obrigatório'),
  infoInstallments: yup.array().of(validationInstallmentsSchema).optional(),
})
const initialValues = {
  image: '',
  method: '',
  availableInstallments: false,
  infoInstallments: [],
}

export default function FormPayment() {
  const payments = usePayments()
  const { setIsLoading } = useApp()
  const [indexEdit, setIndexEdit] = useState(null)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const installmentsFormik = useFormik({
    enableReinitialize: true,
    initialValues: { installments: '', fee: '' },
    validationSchema: validationInstallmentsSchema,
    onSubmit: (values) => {
      formik.setFieldValue('infoInstallments', [
        ...formik?.values?.infoInstallments,
        values,
      ])
      installmentsFormik.resetForm()
    },
  })
  const handleSubmit = async (values) => {
    let response
    let { image } = values
    validationSchema.cast(values, { stripUnknown: true })
    if (!typeOfString(image)) {
      const { image: imageUrl } = await post(
        '/save-image',
        formDataUpload({ image: image }),
        setIsLoading
      )
      image = imageUrl
    }
    if (indexEdit !== null)
      response = await put(
        `/payments/${indexEdit}`,
        { ...values, image },
        setIsLoading,
        toast
      )
    else
      response = await post(
        '/payments',
        { ...values, image },
        setIsLoading,
        toast
      )
    if (response?.success) {
      setIndexEdit(null)
      formik.resetForm()
    }
  }
  const handleEdit = (index, id) => {
    const values = payments[index]
    formik.setFieldValue('image', values.image)
    formik.setFieldValue('method', values.method)
    formik.setFieldValue('availableInstallments', values.availableInstallments)
    formik.setFieldValue('infoInstallments', values.infoInstallments)
    setIndexEdit(id)
  }
  const handleDelete = async (index) => {
    await del(`/payments/${index}`, {}, setIsLoading, toast)
  }
  const handleRemove = (index) =>
    formik.setFieldValue('infoInstallments', [
      ...formik?.values?.infoInstallments.filter((_, i) => i !== index),
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
            error={formik.touched.image && formik.errors.image}
            onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            onClear={() => formik.setFieldValue('image', '')}
          />
          <div className="flex-grow flex flex-col gap-4">
            <div className="flex gap-4">
              <InputLabel
                id="method"
                label="Método"
                placeholder="Infome método"
                name="method"
                error={formik.touched?.method && formik.errors?.method}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.method}
                className="flex-grow"
              />
              <CheckboxToggleLabel
                id="availableInstallments"
                name="availableInstallments"
                label="Aceita parcela"
                onChange={formik.handleChange}
                value={formik.values.availableInstallments}
                checked={formik.values.availableInstallments}
                className="flex-grow"
              />
            </div>
            {formik.values.availableInstallments && (
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
                  {formik?.values?.infoInstallments?.length > 0 &&
                    formik?.values?.infoInstallments.map((item, i) => (
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
          type="submit"
          label={indexEdit !== null ? 'Salvar' : 'Adicionar'}
          className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
        {formik.touched?.payments && formik.errors?.payments && (
          <span className="text-xs text-red-500">
            {formik.errors?.payments}
          </span>
        )}
        <TableData
          columns={paymentColumns(handleEdit, handleDelete)}
          data={payments}
          className="!p-0"
        />
      </div>
    </form>
  )
}
