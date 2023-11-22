/* eslint-disable react/prop-types */
import IconHint from '../icon/icon-hint'
import Image from './image'

export default function ImageLabel({
  id,
  label,
  name,
  info,
  error,
  hint,
  value,
  onClear,
  className,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between text-sm text-gray-900">
          <div className="flex items-center gap-1 relative">
            <label htmlFor={id}>{label}</label>
            {hint && <IconHint hint={hint} />}
          </div>
        </div>
      )}
      <Image
        id={id}
        name={name}
        info={info}
        value={value}
        onClear={onClear}
        className={className}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
