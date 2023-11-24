/* eslint-disable react/prop-types */
import { discount, offer } from '../../../../../../types/filter-type'
import DatePickerLabel from '../../../input/datepicker-label'
import InputLabel from '../../../input/input-label'
import SelectLabel from '../../../input/select-label'

export default function FormInformation({ formik }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <InputLabel
          id="name"
          label="Nome"
          placeholder="Infome nome da oferta"
          name="name"
          error={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="complement"
          label="Complemento"
          placeholder="Infome complemento da oferta"
          name="complement"
          error={formik.touched.complement && formik.errors.complement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.complement}
          className="flex-grow flex-1"
        />
        <SelectLabel
          id="discountType"
          label="Tipo desconto"
          name="discountType"
          placeholder="Selecione"
          data={discount}
          error={formik.touched?.discountType && formik.errors?.discountType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.discountType}
          className="flex-grow flex-1"
        />
      </div>
      <div className="flex gap-4">
        <SelectLabel
          id="offerType"
          label="Tipo oferta"
          name="offerType"
          placeholder="Selecione"
          data={offer}
          error={formik.touched?.offerType && formik.errors?.offerType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.offerType}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="offerValue"
          type="number"
          label="Desconto"
          placeholder="Infome o desconto"
          name="offerValue"
          error={formik.touched?.offerValue && formik.errors?.offerValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.offerValue}
          className="flex-grow flex-1"
        />
        <DatePickerLabel
          id="expiresIn"
          label="Data limite"
          name="expiresIn"
          placeholder="Selecione a data"
          startDate={
            formik.values?.offerPriceDates[0]
              ? new Date(formik.values?.offerPriceDates[0])
              : null
          }
          endDate={
            formik.values?.offerPriceDates[1]
              ? new Date(formik.values?.offerPriceDates[1])
              : null
          }
          onChange={(update) => formik.setFieldValue('offerPriceDates', update)}
          className="flex-grow flex-1"
        />
      </div>
      <div className="flex gap-4">
        <InputLabel
          id="usageLimit.maxCart"
          type="number"
          label="Mínimo produto"
          placeholder="Infome o mínimo de produto"
          name="usageLimit.maxCart"
          error={
            formik.touched?.usageLimit?.maxCart &&
            formik.errors?.usageLimit?.maxCart
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.usageLimit?.maxCart}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="usageLimit.minCart"
          type="number"
          label="Máximo de produto"
          placeholder="Infome o máximo de produto"
          name="usageLimit.minCart"
          error={
            formik.touched?.usageLimit?.minCart &&
            formik.errors?.usageLimit?.minCart
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.usageLimit?.minCart}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="usageLimit.maxCustomer"
          type="number"
          label="Máximo por usuário"
          placeholder="Infome o máximo por usuário"
          name="usageLimit.maxCustomer"
          error={
            formik.touched?.usageLimit?.maxCustomer &&
            formik.errors?.usageLimit?.maxCustomer
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.usageLimit?.maxCustomer}
          className="flex-grow flex-1"
        />
      </div>
    </div>
  )
}
