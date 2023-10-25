/* eslint-disable react/prop-types */
import Checkbox from './checkbox'

export default function CheckboxLabel({ id, name, label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id={id} name={name} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
