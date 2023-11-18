import { mergeClassName } from '../../../../utils/format'

/* eslint-disable react/prop-types */
export default function Button({ type, label, icon, className, ...props }) {
  return (
    <button
      type={type || 'button'}
      className={mergeClassName(
        'flex items-center justify-center gap-3 font-semibold uppercase py-3 px-6 rounded-sm text-xs border border-transparent duration-300 ease-in-out disabled:bg-orange-400 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {label}
      {icon}
    </button>
  )
}
