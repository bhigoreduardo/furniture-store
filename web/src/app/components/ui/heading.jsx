import { mergeClassName } from '../../../utils/format'

/* eslint-disable react/prop-types */
export default function Heading({ title, btn, className }) {
  return (
    <div
      className={mergeClassName(
        'flex items-center justify-between uppercase px-6 pb-2 border-b border-gray-100',
        className
      )}
    >
      <span className="font-semibold text-sm text-gray-900">
        {title}
      </span>
      {btn && btn}
    </div>
  )
}
