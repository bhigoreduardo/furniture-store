/* eslint-disable react/prop-types */
import { MagnifyingGlass } from 'phosphor-react'

import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import RadioBoxLabel from '../../../input/radiobox-label'

export default function FormBrand(props) {
  const handleClear = () => {
    props.formik.setFieldValue('brand', '')
  }
  return (
    <FormWrapper title="Marca" handleClear={handleClear}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel
            id="searchBrand"
            placeholder="Pesquisar"
            name="searchBrand"
            icon={<MagnifyingGlass className="text-gray-400" />}
            className="flex-grow"
          />
          {props.formik.touched.brand && props.formik.errors.brand && (
            <span className="text-xs text-red-500">
              {props.formik.errors.brand}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <RadioBoxLabel
            name="brand"
            label="Rimo"
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
          />
          <RadioBoxLabel
            name="brand"
            label="Rimo"
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
          />
        </div>
      </div>
    </FormWrapper>
  )
}
