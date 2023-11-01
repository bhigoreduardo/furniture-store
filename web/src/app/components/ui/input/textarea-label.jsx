/* eslint-disable react/prop-types */
import { mergeClassName } from '../../../../utils/format'
import IconHint from '../icon/icon-hint'
import TextArea from './textarea'

export default function TextAreaLabel({
  id,
  label,
  name,
  placeholder,
  error,
  hint,
  btn,
  className,
  ...props
}) {
  return (
    <div className={mergeClassName('flex flex-col gap-2', className)}>
      <span className="flex items-center justify-between text-sm text-gray-900">
        <div className="flex items-center gap-1 relative">
          <label htmlFor={id}>{label}</label>
          {hint && <IconHint hint={hint} />}
        </div>
        {btn}
      </span>
      <TextArea
        id={id}
        placeholder={placeholder}
        name={name}
        className={`${error && 'border-red-500'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
