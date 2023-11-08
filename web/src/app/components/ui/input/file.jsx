/* eslint-disable react/prop-types */
import { ImageSquare, XCircle } from 'phosphor-react'

import { mergeClassName } from '../../../../utils/format'

export default function File({
  id,
  name,
  info,
  className,
  value,
  onClear,
  ...props
}) {
  return (
    <label
      className={mergeClassName(
        'relative flex flex-col items-center justify-center gap-3 w-[100px] h-[100px] border border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-sm',
        className
      )}
    >
      {!value ? (
        <>
          <input
            type="file"
            id={id}
            name={name}
            {...props}
            className="hidden"
          />
          <ImageSquare size={20} className="text-gray-600" />
          <span className="text-xs text-gray-600">{info}</span>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onClear}
            className="absolute z-50 -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full"
          >
            <XCircle size={20} />
          </button>
          <div className="flex items-center justify-center bg-gray-500 w-full h-full overflow-hidden">
            <img
              src={
                typeof value === 'string'
                  ? `${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${value}`
                  : window.URL.createObjectURL(value)
              }
              className="object-cover"
            />
          </div>
        </>
      )}
    </label>
  )
}
