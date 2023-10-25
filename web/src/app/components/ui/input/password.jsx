/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'

import { mergeClassName } from '../../../../utils/format'

export default function Password({
  id,
  placeholder,
  name,
  className,
  ...props
}) {
  const [isNonPassword, setIsNonPassword] = useState(false)

  return (
    <div
      className={mergeClassName(
        'flex items-center gap-1 py-2 px-4 bg-white border border-gray-300 rounded-sm',
        className
      )}
    >
      <input
        type={isNonPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        name={name}
        className="w-full placeholder:text-gray-400 text-gray-700 text-sm"
        {...props}
      />
      <button type="button" onClick={() => setIsNonPassword(!isNonPassword)}>
        {isNonPassword ? (
          <EyeSlash size={20} className="text-gray-900" />
        ) : (
          <Eye size={20} className="text-gray-900" />
        )}
      </button>
    </div>
  )
}
