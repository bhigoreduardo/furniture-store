/* eslint-disable react/prop-types */
import { mergeClassName } from '../../../../utils/format'

export default function Input({
  id,
  type,
  placeholder,
  name,
  icon,
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
      <input
        type={type || 'text'}
        id={id}
        placeholder={placeholder}
        name={name}
        className="w-full placeholder:text-gray-400 text-gray-700 text-sm"
        {...props}
      />
      {icon}
    </div>
  )
}
