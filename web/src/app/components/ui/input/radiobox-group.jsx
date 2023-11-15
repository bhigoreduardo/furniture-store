/* eslint-disable react/prop-types */
import IconHint from '../icon/icon-hint'
import RadioBox from './radiobox'

export default function RadioBoxGroup({
  label,
  name,
  data,
  error,
  hint,
  w = 10,
  h = 10,
  border = 1,
  selectedValue,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-sm text-gray-900">
        <div className="flex items-center gap-1 relative">
          <label>{label}</label>
          {hint && <IconHint hint={hint} />}
        </div>
      </span>
      <div className="flex gap-1">
        {data?.map((item) => (
          <RadioBox
            key={item.value}
            value={item.value}
            name={name}
            w={w}
            h={h}
            border={border}
            bg={item.color}
            title={item.label}
            checked={item.value === selectedValue}
            {...props}
          />
        ))}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
