/* eslint-disable react/prop-types */
import { Minus, Plus } from 'phosphor-react'
import { mergeClassName } from '../../../../utils/format'

export default function Count({ className }) {
  return (
    <div
      className={mergeClassName(
        'flex items-center justify-between border border-gray-200 rounded-sm',
        className
      )}
    >
      <button
        type="button"
        className="flex-1 flex justify-center items-center hover:bg-orange-500 hover:text-white text-gray-900 h-full py-4 duration-300 ease-in-out"
      >
        <Minus size={16} />
      </button>
      <span className="text-base text-gray-900 flex-1 text-center">1</span>
      <button
        type="button"
        className="flex-1 flex justify-center items-center hover:bg-orange-500 hover:text-white text-gray-900 h-full py-4 duration-300 ease-in-out"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
