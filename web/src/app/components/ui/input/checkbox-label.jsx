/* eslint-disable react/prop-types */
import Checkbox from './checkbox'

export default function CheckboxLabel({
  id,
  name,
  label,
  icon,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id={id} name={name} {...props} />
          <label htmlFor={id}>{label}</label>
        </div>
        {icon}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
