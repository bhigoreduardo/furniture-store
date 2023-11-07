/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { makeArrTree, regexCaseIgnore } from '../../../../../../utils/format'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import CheckboxFamily from '../../../input/checkbox-family'

const categories = [
  {
    _id: '213678',
    name: 'Pai 1',
    parent: null,
  },
  {
    _id: '783912',
    name: 'Filho 1 do Pai 1',
    parent: '213678',
  },
  {
    _id: '783512',
    name: 'Filho 2 do Pai 1',
    parent: '213678',
  },
  {
    _id: '789321',
    name: 'Filho 1 do Filho 1 do Pai 1',
    parent: '783912',
  },
  {
    _id: '216678',
    name: 'Pai 2',
    parent: null,
  },
]

export default function FormCategory(props) {
  const [search, setSearch] = useState('')
  const [dataSearch, setDataSearch] = useState(categories)
  const handleSearch = () => {
    setDataSearch(() =>
      search !== ''
        ? categories.filter((item) => regexCaseIgnore(search, item.name))
        : categories
    )
  }
  const arrTree = makeArrTree(dataSearch, null)
  useEffect(() => {
    handleSearch()
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FormWrapper title="Categoria">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel
            id="searchCategory"
            placeholder="Pesquisar"
            name="searchCategory"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={
              <MagnifyingGlass className="text-gray-400" weight="duotone" />
            }
            className="flex-grow"
          />
          {props.formik.touched.category && props.formik.errors.category && (
            <span className="text-xs text-red-500">
              {props.formik.errors.category}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {arrTree?.length > 0 ? (
            arrTree.map((item) => (
              <CheckboxFamily
                key={item._id}
                familyTree={item}
                formik={props.formik}
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
