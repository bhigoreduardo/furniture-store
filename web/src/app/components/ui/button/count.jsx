/* eslint-disable react/prop-types */
import { Minus, Plus } from 'phosphor-react'
import { mergeClassName } from '../../../../utils/format'
import { useEffect } from 'react'

export default function Count({ stock, formik, value, className }) {
  const handleDecrease = () => {
    if (!stock || formik.values.quantity === 1) return
    formik.values.quantity > 1 && formik.setFieldValue('quantity', value - 1)
  }
  const handleIncrease = () => {
    if (!stock || formik.values.quantity === stock) return
    formik.setFieldValue('quantity', value + 1)
  }
  useEffect(() => {
    if (formik.values.quantity > stock) formik.setFieldValue('quantity', stock)
  }, [stock]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={mergeClassName(
        'flex items-center justify-between border border-gray-200 rounded-sm',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrease}
        className="flex-1 flex justify-center items-center hover:bg-orange-500 hover:text-white text-gray-900 h-full py-4 duration-300 ease-in-out"
      >
        <Minus size={16} />
      </button>
      <span className="text-base text-gray-900 flex-1 text-center">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        className="flex-1 flex justify-center items-center hover:bg-orange-500 hover:text-white text-gray-900 h-full py-4 duration-300 ease-in-out"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
