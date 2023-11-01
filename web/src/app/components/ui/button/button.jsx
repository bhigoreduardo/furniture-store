import { mergeClassName } from '../../../../utils/format'

/* eslint-disable react/prop-types */
export default function Button({ type, label, icon, className, ...props }) {
  return (
    <button
      type={type || 'button'}
      className={mergeClassName(
        'flex items-center justify-center gap-3 font-semibold uppercase py-3 px-6 rounded-sm text-xs border border-transparent',
        className
      )}
      {...props}
    >
      {label}
      {icon}
    </button>
  )
}
