/* eslint-disable react/prop-types */
import { mergeClassName } from '../../../../utils/format'
import CheckboxToggle from './checkboxtoggle'

export default function CheckboxToggleLabel({
  id,
  name,
  label,
  error,
  className,
  ...props
}) {
  return (
    <div className={mergeClassName('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-2 text-sm text-gray-900">
        <label htmlFor={id}>{label}</label>
        <CheckboxToggle id={id} name={name} {...props} />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
