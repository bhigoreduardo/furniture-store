/* eslint-disable react/prop-types */
import File from './file'

export default function FileLabel({
  id,
  label,
  name,
  info,
  error,
  value,
  onClear,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between text-sm text-gray-900">
          <div className="flex items-center gap-1 relative">
            <label htmlFor={id}>{label}</label>
          </div>
        </div>
      )}
      <File
        id={id}
        name={name}
        info={info}
        value={value}
        onClear={onClear}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
