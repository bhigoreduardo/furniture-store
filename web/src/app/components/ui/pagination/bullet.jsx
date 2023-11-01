import { mergeClassName } from '../../../../utils/format'

/* eslint-disable react/prop-types */
export default function Bullet({ label, selected, className, ...props }) {
  return (
    <button
      type="button"
      className={mergeClassName(
        `w-[30px] h-[30px] flex items-center justify-center border border-gray-300 rounded-full text-xs text-gray-600 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 ${
          selected && 'bg-orange-500 text-white border-orange-500'
        }`,
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
}
