/* eslint-disable react/prop-types */
export default function Checkbox({ id, name, ...props }) {
  return (
    <label className="relative cursor-pointer w-4 h-4">
      <input
        id={id}
        type="checkbox"
        name={name}
        className="peer hidden"
        {...props}
      />
      <span className="absolute w-4 h-4 border-[2px] bg-white border-gray-300 rounded-sm peer-checked:border-orange-500 peer-checked:bg-orange-500 after:absolute after:hidden peer-checked:after:block after:left-1/2 after:-translate-x-1/2 after:w-[6px] after:h-[10px] after:border-b-[3px] after:border-r-[3px] after:border-white after:rotate-45 peer-disabled:bg-gray-200" />
    </label>
  )
}
