/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { PlusCircle } from 'phosphor-react'

import { offer } from '../../../../../../../types/product-type'
import { invetoryProductColumns } from '../../../../../../../utils/constants/admin'
import { validationInventoryInfoSchema } from '..'
import Button from '../../../../button/button'
import CheckboxToggleLabel from '../../../../input/checkboxtoggle-label'
import DatePickerLabel from '../../../../input/datepicker-label'
import InputLabel from '../../../../input/input-label'
import SelectLabel from '../../../../input/select-label'
import TableData from '../../../../table/table-data'

const initialValues = {
  color: '',
  stock: '',
  price: '',
  offer: {
    offerValue: '',
    offerType: '',
    offerPrice: '',
    offerPriceDates: [null, null],
  },
  featured: true,
}

export default function Stocked(props) {
  const [indexEdit, setIndexEdit] = useState(null)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationInventoryInfoSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = (values) => {
    const curValues = props.formik?.values?.productData?.inventory?.info
    if (indexEdit === null) {
      props.formik.setFieldValue('productData.inventory.info', [
        ...curValues,
        values,
      ])
    } else {
      curValues[indexEdit] = values
      props.formik.setFieldValue('productData.inventory.info', [...curValues])
      setIndexEdit(null)
    }
    formik.resetForm()
  }
  const handleEdit = (index) => {
    const values = props.formik?.values?.productData?.inventory?.info[index]
    formik.setFieldValue('color', values.color)
    formik.setFieldValue('stock', values.stock)
    formik.setFieldValue('price', values.price)
    formik.setFieldValue('offer', { ...values.offer })
    formik.setFieldValue('featured', values.featured)
    // formik.setFieldValue('offer.offerPriceDates', {...values.offer?.offerPriceDates})
    setIndexEdit(index)
  }
  const handleDelete = (index) => {
    props.formik.setFieldValue('productData.inventory.info', [
      ...props.formik?.values?.productData?.inventory?.info.filter(
        (_, i) => i !== index
      ),
    ])
    formik.resetForm()
    setIndexEdit(null)
  }
  const handleCalculateOffer = () => {
    const price = formik.values.price
    const offerValue = formik.values.offer?.offerValue
    const offerType = formik.values.offer?.offerType
    if (offerType === 'percentage')
      formik.setFieldValue('offer.offerPrice', price * (1 - offerValue / 100))
    else formik.setFieldValue('offer.offerPrice', price - offerValue)
  }
  useEffect(() => {
    handleCalculateOffer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.price,
    formik.values.offer?.offerValue,
    formik.values.offer?.offerType,
  ])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <CheckboxToggleLabel
          id="productData.inventory.manageStock"
          name="productData.inventory.manageStock"
          label="Controle de estoque"
          error={
            props.formik.touched?.productData?.inventory?.manageStock &&
            props.formik.errors?.productData?.inventory?.manageStock
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.inventory?.manageStock}
          checked={props.formik.values?.productData?.inventory?.manageStock}
        />
        <CheckboxToggleLabel
          id="productData.inventory.stockStatus"
          name="productData.inventory.stockStatus"
          label="Exibir estoque"
          error={
            props.formik.touched?.productData?.inventory?.stockStatus &&
            props.formik.errors?.productData?.inventory?.stockStatus
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.inventory?.stockStatus}
          checked={props.formik.values?.productData?.inventory?.stockStatus}
        />
        <CheckboxToggleLabel
          id="productData.inventory.lowStockWarning"
          name="productData.inventory.lowStockWarning"
          label="Aviso de baixo estoque"
          error={
            props.formik.touched?.productData?.inventory?.lowStockWarning &&
            props.formik.errors?.productData?.inventory?.lowStockWarning
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.inventory?.lowStockWarning}
          checked={props.formik.values?.productData?.inventory?.lowStockWarning}
        />
      </div>
      <div className="flex gap-4">
        <SelectLabel
          id="color"
          label="Cor"
          name="color"
          placeholder="Cor"
          data={[{ value: '10', label: '10' }]}
          error={formik.touched?.color && formik.errors?.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.color}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="stock"
          type="number"
          label="Quantidade"
          placeholder="Infome a quantidade"
          name="stock"
          error={formik.touched?.stock && formik.errors?.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.stock}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="price"
          type="number"
          label="Preço"
          placeholder="Infome o preço"
          name="price"
          error={formik.touched?.price && formik.errors?.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.price}
          className="flex-grow flex-1"
        />
      </div>
      <div className="flex gap-4">
        <InputLabel
          id="offer.offerValue"
          type="number"
          label="Desconto"
          placeholder="Infome o desconto"
          name="offer.offerValue"
          error={
            formik.touched?.offer?.offerValue &&
            formik.errors?.offer?.offerValue
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.offer?.offerValue}
          className="flex-grow flex-1"
        />
        <SelectLabel
          id="offer.offerType"
          label="Tipo desconto"
          name="offer.offerType"
          placeholder="Selecione"
          data={offer}
          error={
            formik.touched?.offer?.offerType && formik.errors?.offer?.offerType
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.offer?.offerType}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="offer.offerPrice"
          type="number"
          label="Preço desconto"
          placeholder="Desconto final"
          name="offer.offerPrice"
          error={
            formik.touched?.offer?.offerPrice &&
            formik.errors?.offer?.offerPrice
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.offer?.offerPrice}
          className="flex-grow flex-1"
          disabled
        />
      </div>
      <div className="flex gap-4">
        <DatePickerLabel
          id="expiresIn"
          label="Data limite"
          name="expiresIn"
          placeholder="Selecione a data"
          startDate={formik.values?.offer?.offerPriceDates[0]}
          endDate={formik.values?.offer?.offerPriceDates[1]}
          onChange={(update) =>
            formik.setFieldValue('offer.offerPriceDates', update)
          }
          // handleChange={(values) => {
          //   console.log(values)
          // }}
          className="flex-grow flex-1"
        />
        <CheckboxToggleLabel
          id="featured"
          name="featured"
          label="Pronta entrega"
          error={formik.touched?.featured && formik.errors?.featured}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.featured}
          checked={formik.values?.featured}
          className="flex-grow flex-1"
        />
      </div>
      <Button
        label={indexEdit !== null ? 'Salvar' : 'Adicionar'}
        onClick={formik.handleSubmit}
        icon={<PlusCircle size={16} className="text-white" />}
        className="bg-orange-500 text-white hover:bg-orange-600 !py-2 w-fit"
      />
      <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
        {props.formik.touched?.productData?.inventory &&
          props.formik.errors?.productData?.inventory && (
            <span className="text-xs text-red-500">
              {props.formik.errors?.productData?.inventory}
            </span>
          )}
        <TableData
          columns={invetoryProductColumns(handleEdit, handleDelete)}
          data={props.formik.values?.productData?.inventory?.info}
          className="!p-0"
        />
      </div>
    </div>
  )
}
