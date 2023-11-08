/* eslint-disable react/prop-types */
import CheckboxToggleLabel from '../../../input/checkboxtoggle-label'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'

export default function FormIdentity({ formik }) {
  const handleClear = () => {
    formik.setFieldValue('name', '')
    formik.setFieldValue('sku', '')
    formik.setFieldValue('code', '')
    formik.setFieldValue('status', '')
  }
  return (
    <FormWrapper title="Identitifação" handleClear={handleClear}>
      <div className="flex flex-col gap-4">
        <CheckboxToggleLabel
          id="status"
          name="status"
          label="Status"
          error={formik.touched.status && formik.errors.status}
          onChange={() => {
            formik.setFieldValue('status', !formik.values.status)
          }}
          onBlur={formik.handleBlur}
          checked={formik.values.status}
        />

        <div className="flex gap-4">
          <InputLabel
            id="name"
            label="Nome"
            placeholder="Infome nome do produto"
            name="name"
            error={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="flex-grow"
          />
          <InputLabel
            id="sku"
            label="SKU"
            placeholder="Infome sku do produto"
            name="sku"
            error={formik.touched.sku && formik.errors.sku}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sku}
            className="flex-grow"
          />
          <InputLabel
            id="code"
            label="Código"
            placeholder="Infome código do produto"
            name="code"
            error={formik.touched.code && formik.errors.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            className="flex-grow"
          />
        </div>
      </div>
    </FormWrapper>
  )
}
