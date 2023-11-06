/* eslint-disable react/prop-types */
import { mergeClassName } from '../../../../utils/format'

export default function CardOverview({ icon, value, description, className }) {
  return (
    <article
      className={mergeClassName(
        'w-full flex items-center gap-4 p-4 rounded-sm shadow-md',
        className
      )}
    >
      <div className="bg-white p-3 rounded-sm">{icon}</div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-xl text-gray-900">{value}</span>
        <span className="text-sm text-gray-600">{description}</span>
      </div>
    </article>
  )
}
