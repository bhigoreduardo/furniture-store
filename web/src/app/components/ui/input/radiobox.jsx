/* eslint-disable react/prop-types */
export default function RadioBox({ id, name, ...props }) {
  return (
    <label className="relative cursor-pointer w-4 h-4">
      <input
        id={id}
        type="radio"
        name={name}
        className="peer hidden"
        {...props}
      />
      <span className="absolute w-4 h-4 border-[2px] bg-white border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:border-[5px] peer-disabled:bg-gray-200" />
    </label>
  )
}
