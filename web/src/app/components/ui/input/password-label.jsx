/* eslint-disable react/prop-types */
import Hint from '../icon/hint'
import Password from './password'

export default function PasswordLabel({
  id,
  label,
  name,
  placeholder,
  error,
  hint,
  btn,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-sm text-gray-900">
        <div className="flex items-center gap-1 relative">
          <label htmlFor={id}>{label}</label>
          {hint && <Hint hint={hint} />}
        </div>
        {btn}
      </span>
      <Password
        id={id}
        placeholder={placeholder}
        name={name}
        className={`${error && "border-red-500"}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
