/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { PlusCircle } from 'phosphor-react'

import { initialInventoryValues, validationInventorySchema } from '..'
import { invetoryProductColumns } from '../../../../../../../utils/constants/admin'
import Button from '../../../../button/button'
import CheckboxToggleLabel from '../../../../input/checkboxtoggle-label'
import DatePickerLabel from '../../../../input/datepicker-label'
import InputLabel from '../../../../input/input-label'
import SelectLabel from '../../../../input/select-label'
import TableData from '../../../../table/table-data'

export default function Stocked(props) {
  const formik = useFormik({
    initialValues: initialInventoryValues,
    validationSchema: validationInventorySchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = (values) =>
    props.formik.setFieldValue('productData.inventory', [
      ...props.formik.values?.productData?.inventory,
      values,
    ])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <CheckboxToggleLabel
          id="manageStock"
          name="manageStock"
          label="Controle de estoque"
          error={formik.touched?.manageStock && formik.errors?.manageStock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.manageStock}
        />
        <CheckboxToggleLabel
          id="stockStatus"
          name="stockStatus"
          label="Exibir estoque"
          error={formik.touched?.stockStatus && formik.errors?.stockStatus}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.stockStatus}
        />
        <CheckboxToggleLabel
          id="lowStockWarning"
          name="lowStockWarning"
          label="Aviso de baixo estoque"
          error={
            formik.touched?.lowStockWarning && formik.errors?.lowStockWarning
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.lowStockWarning}
        />
      </div>
      <div className="flex gap-4">
        <SelectLabel
          id="info.color"
          label="Cor"
          name="info.color"
          placeholder="Cor"
          data={[]}
          error={formik.touched?.info?.color && formik.errors?.info?.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.color}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="info.stock"
          type="number"
          label="Quantidade"
          placeholder="Infome a quantidade"
          name="info.stock"
          error={formik.touched?.info?.stock && formik.errors?.info?.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.stock}
          className="flex-grow flex-1"
        />
      </div>
      <div className="flex gap-4">
        <InputLabel
          id="info.price"
          type="number"
          label="Preço"
          placeholder="Infome o preço"
          name="info.price"
          error={formik.touched?.info?.price && formik.errors?.info?.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.price}
          className="flex-grow"
        />
        <InputLabel
          id="info.offer.offerValue"
          type="number"
          label="Desconto"
          placeholder="Infome o desconto"
          name="info.offer.offerValue"
          error={
            formik.touched?.info?.offer?.offerValue &&
            formik.errors?.info?.offer?.offerValue
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.offer?.offerValue}
          className="flex-grow"
        />
      </div>
      <div className="flex gap-4">
        <SelectLabel
          id="info.offer.offerType"
          label="Tipo desconto"
          name="info.offer.offerType"
          placeholder="Selecione"
          data={[]}
          error={
            formik.touched?.info?.offer?.offerType &&
            formik.errors?.info?.offer?.offerType
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.offer?.offerType}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="info.offer.offerPrice"
          type="number"
          label="Preço desconto"
          placeholder="Desconto final"
          name="info.offer.offerPrice"
          error={
            formik.touched?.info?.offer?.offerPrice &&
            formik.errors?.info?.offer?.offerPrice
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.offer?.offerPrice}
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
          handleChange={(values) => {
            console.log(values)
          }}
          className="flex-grow flex-1"
        />
        <CheckboxToggleLabel
          id="info.featured"
          name="info.featured"
          label="Pronta entrega"
          error={
            formik.touched?.info?.featured && formik.errors?.info?.featured
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.info?.featured}
          className="flex-grow flex-1"
        />
      </div>
      <Button
        label="Adicionar"
        onClick={formik.handleSubmit}
        icon={<PlusCircle size={16} className="text-white" />}
        className="bg-orange-500 text-white hover:bg-orange-600 !py-2 w-fit"
      />
      <div className="flex flex-col gap-3 overflow-y-auto max-[300px]">
        <TableData
          columns={invetoryProductColumns}
          data={props.formik.values?.productData?.inventory}
          className="!p-0"
        />
      </div>
    </div>
  )
}
