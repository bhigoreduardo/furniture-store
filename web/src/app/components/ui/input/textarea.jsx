/* eslint-disable react/prop-types */
import { mergeClassName } from '../../../../utils/format'

export default function TextArea({
  id,
  name,
  placeholder,
  className,
  ...props
}) {
  return (
    <div
      className={mergeClassName(
        'flex items-center gap-1 py-2 px-4 bg-white border border-gray-300 rounded-sm',
        className
      )}
    >
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        cols="30"
        rows="10"
        className="w-full placeholder:text-gray-400 text-gray-700 text-sm resize-none"
        {...props}
      />
    </div>
  )
}
