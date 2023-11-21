/* eslint-disable react/prop-types */
import { XCircle } from 'phosphor-react'

import Badge from '../badge'
import { mergeClassName } from '../../../../utils/format'

export default function Tag({ content, handleRemove, className }) {
  return (
    <button
      type="button"
      onClick={handleRemove}
      className={mergeClassName('group relative', className)}
    >
      <Badge content={content} className="bg-gray-200" />
      <Badge
        content={<XCircle size={20} />}
        className="w-full h-full hidden group-hover:inline-flex justify-center text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-40"
      />
    </button>
  )
}
