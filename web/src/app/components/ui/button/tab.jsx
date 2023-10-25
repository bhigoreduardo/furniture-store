import { mergeClassName } from '../../../../utils/format'

/* eslint-disable react/prop-types */
export default function Tab({ label, active, className, ...props }) {
  return (
    <button
      type="button"
      className={mergeClassName(
        `text-sm text-gray-500 bg-white p-4 border-b-[2px] border-transparent ${active && "font-semibold text-gray-900 !border-orange-500"} hover:bg-gray-50`,
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
}
