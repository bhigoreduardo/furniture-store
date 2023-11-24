/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { offerProductColumns } from '../../../../../../utils/constants/admin'
import Heading from '../../../heading'
import CheckboxToggleLabel from '../../../input/checkboxtoggle-label'
import FormCategory from '../form-products/form-category'
import FormBrand from '../form-products/form-brand'
import FormProduct from '../form-product'

export default function FormSpecification({ formik }) {
  const handleDelete = (index) =>
    formik.setFieldValue('product', [
      ...formik?.values?.product?.filter((item) => item !== index),
    ])

  return (
    <div className="flex flex-col gap-6">
      <Heading title="Informações específicas" />
      <div className="flex flex-col gap-4">
        <CheckboxToggleLabel
          id="everyOne"
          name="everyOne"
          label="Todos produtos"
          error={formik.touched?.everyOne && formik.errors?.everyOne}
          onChange={() => {
            formik.setFieldValue('everyOne', !formik.values.everyOne)
            formik.setFieldValue('category', [])
            formik.setFieldValue('brand', [])
            formik.setFieldValue('product', [])
          }}
          onBlur={formik.handleBlur}
          value={formik.values?.everyOne}
          checked={formik.values?.everyOne}
        />
        {formik?.values?.everyOne !== true && (
          <>
            <div className="flex gap-4">
              <FormCategory
                formik={formik}
                label="Categoria"
                className="flex-1"
              />
              <FormBrand
                formik={formik}
                label="Marca"
                multiple
                className="flex-1"
              />
            </div>
            <FormProduct
              formik={formik}
              columns={offerProductColumns(handleDelete)}
            />
          </>
        )}
      </div>
    </div>
  )
}
