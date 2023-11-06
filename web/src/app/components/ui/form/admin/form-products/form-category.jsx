/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { makeTree } from '../../../../../../utils/format'
import InputLabel from '../../../input/input-label'
import FormWrapper from '../form-wrapper'
import CheckboxLabel from '../../../input/checkbox-label'

const categories = [
  {
    _id: '213678',
    name: 'Sapatos',
    parent: null,
  },
  {
    _id: '783912',
    name: 'Sapatos de couro',
    parent: '213678',
  },
  {
    _id: '783512',
    name: 'Sapatos de couro',
    parent: '213678',
  },
  {
    _id: '789321',
    name: 'Sapata usuado',
    parent: '783912',
  },
  {
    _id: '216678',
    name: 'Sapatos',
    parent: null,
  },
]

export default function FormCategory(props) {
  const tree = makeTree(categories, null)
  console.log(tree)
  // Object.entries(tree).map((item) => {
  //   console.log(item.shift())
  //   console.log(item)

  //   Object.entries(item).map((i) => {
  //     console.log(i.shift())
  //     console.log(i)
  //   })
  // })
  // const myFn = (items) =>
  //   items.length ? `${items.shift()} ${myFn(items)}` : ''
  // console.log(myFn(Object.keys(tree)))
  return (
    <FormWrapper title="Categoria">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel
            id="searchCategory"
            placeholder="Pesquisar"
            name="searchCategory"
            icon={<MagnifyingGlass className="text-gray-400" />}
            className="flex-grow"
          />
          {props.formik.touched.category && props.formik.errors.category && (
            <span className="text-xs text-red-500">
              {props.formik.errors.category}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {categories.map((item, i) => (
            <Fragment key={i}>
              <CheckboxLabel label={item.name} />
              <div className="flex flex-col gap-1 pl-4">
                {item?.children?.map((i) => (
                  <CheckboxLabel key={i._id} label={i.name} />
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
