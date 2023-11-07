/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { regexCaseIgnore } from '../../../../../../utils/format'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import RadioBoxLabel from '../../../input/radiobox-label'

const brands = [
  {
    _id: '213678',
    name: 'Pai 1',
  },
  {
    _id: '783912',
    name: 'Filho 1 do Pai 1',
  },
  {
    _id: '783512',
    name: 'Filho 2 do Pai 1',
  },
]

export default function FormBrand(props) {
  const [search, setSearch] = useState('')
  const [dataSearch, setDataSearch] = useState(brands)
  const handleClear = () => {
    props.formik.setFieldValue('brand', '')
  }
  const handleSearch = () => {
    setDataSearch(() =>
      search !== ''
        ? brands.filter((item) => regexCaseIgnore(search, item.name))
        : brands
    )
  }
  useEffect(() => {
    handleSearch()
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FormWrapper title="Marca" handleClear={handleClear}>
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
          {dataSearch?.length > 0 ? (
            dataSearch.map((item) => (
              <RadioBoxLabel
                key={item._id}
                name="brand"
                value={item._id}
                label={item.name}
                onChange={(e) =>
                  props.formik.setFieldValue('brand', e.target.value)
                }
                onBlur={props.formik.handleBlur}
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
