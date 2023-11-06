/* eslint-disable react/prop-types */

import { mergeClassName } from '../../../../utils/format'
import IconHint from '../icon/icon-hint'
import DatePickerUI from './datepicker'

export default function DatePickerLabel({
  id,
  label,
  name,
  error,
  hint,
  className,
  handleChange,
  ...props
}) {
  return (
    <div className={mergeClassName('flex flex-col gap-2', className)}>
      <span className="flex items-center justify-between">
        <div className="flex items-center gap-1 relative text-sm text-gray-900">
          {label && <label htmlFor={id}>{label}</label>}
          {hint && <IconHint hint={hint} />}
        </div>
      </span>
      <DatePickerUI
        id={id}
        name={name}
        handleChange={handleChange}
        className={`${error && 'border-red-500'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
