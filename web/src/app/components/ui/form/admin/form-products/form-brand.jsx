/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { useBrands } from '../../../../../../hooks/use-brand'
import { regexCaseIgnore } from '../../../../../../utils/format'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import RadioBoxLabel from '../../../input/radiobox-label'

export default function FormBrand(props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const brands = useBrands()
  const handleSearch = () =>
    setFilter(() =>
      search !== ''
        ? brands.filter((item) => regexCaseIgnore(search, item.name))
        : brands
    )
  useEffect(() => {
    handleSearch()
  }, [search, brands]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FormWrapper title="Marca">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel
            id="searchBrand"
            placeholder="Pesquisar"
            name="searchBrand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={
              <MagnifyingGlass className="text-gray-400" weight="duotone" />
            }
            className="flex-grow"
          />
          {props.formik.touched.brand && props.formik.errors.brand && (
            <span className="text-xs text-red-500">
              {props.formik.errors.brand}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {filter?.length > 0 ? (
            filter.map((item) => (
              <RadioBoxLabel
                key={item._id}
                name="brand"
                value={item._id}
                label={item.name}
                onChange={(e) =>
                  props.formik.setFieldValue('brand', e.target.value)
                }
                onBlur={props.formik.handleBlur}
                checked={props.formik.values.brand === item._id}
              />
            ))
          ) : (
            <span className="text-sm text-gray-600">Sem resultados</span>
          )}
        </div>
      </div>
    </FormWrapper>
  )
}
