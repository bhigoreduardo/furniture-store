/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { mergeClassName } from '../../../../utils/format'

export default function Arrow({ direction = 'left', className, ...props }) {
  return (
    <button
      type="button"
      className={mergeClassName(
        'p-2 border border-gray-300 text-gray-600 rounded-full hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50',
        className
      )}
      {...props}
    >
      {direction === 'left' ? (
        <ArrowLeft size={14} />
      ) : (
        <ArrowRight size={14} />
      )}
    </button>
  )
}
