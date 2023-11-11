/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MinusCircle, PlusCircle } from 'phosphor-react'

import CheckboxLabel from './checkbox-label'

export default function CheckboxFamily({ familyTree, formik }) {
  const [isVisible, setIsVisible] = useState(
    formik.values?.category?.includes(familyTree._id)
  )
  const setCategories = (e) =>
    formik.values?.category?.length > 0
      ? formik.values?.category?.includes(e.target.value)
        ? [
            ...formik.values?.category?.filter(
              (item) => item !== e.target.value
            ),
          ]
        : [...formik.values?.category, e.target.value]
      : [e.target.value]

  return (
    <div>
      <CheckboxLabel
        label={familyTree.name}
        value={familyTree._id}
        onChange={(e) => {
          setIsVisible(e.target.checked)
          formik.setFieldValue('category', setCategories(e))
        }}
        icon={
          familyTree?.children?.length > 0 &&
          (isVisible ? (
            <MinusCircle weight="duotone" className="text-orange-500" />
          ) : (
            <PlusCircle weight="duotone" className="text-gray-700" />
          ))
        }
        checked={formik.values?.category?.includes(familyTree._id)}
      />
      {isVisible &&
        familyTree?.children?.map((item) => (
          <div key={item._id} className="pl-4">
            <CheckboxFamily familyTree={item} formik={formik} />
          </div>
        ))}
    </div>
  )
}
