/* eslint-disable react/prop-types */
export default function CheckboxToggle({ id, name, ...props }) {
  return (
    <label className="relative cursor-pointer">
      <input
        id={id}
        type="checkbox"
        name={name}
        className="peer hidden"
        {...props}
      />
      <span className="relative inline-block w-8 h-5 border border-gray-300 bg-white rounded-[100px] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 peer-checked:after:left-[calc(100%-16px)] after:w-3 after:h-3 after:bg-gray-300 peer-checked:after:bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 after:rounded-full"></span>
    </label>
  )
}
