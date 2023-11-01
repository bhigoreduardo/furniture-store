/* eslint-disable react/prop-types */
export default function Heading({ title, btn }) {
  return (
    <div className="flex items-center justify-between px-6 pb-2 border-b border-gray-100">
      <span className="font-semibold uppercase text-sm text-gray-900">
        {title}
      </span>
      {btn && btn}
    </div>
  )
}
