/* eslint-disable react/prop-types */
export default function RadioBox({
  id,
  name,
  w = 4,
  h = 4,
  border = 5,
  bg,
  title,
  ...props
}) {
  return (
    <label className={`relative cursor-pointer w-${w} h-${h}`}>
      <input
        id={id}
        type="radio"
        name={name}
        className="peer hidden"
        {...props}
      />
      <span
        title={title}
        className={`absolute inline-block w-${w} h-${h} border-[2px] bg-white border-gray-300 rounded-full peer-checked:border-orange-500 hover:border-orange-600 peer-checked:border-[${border}px] peer-disabled:bg-gray-200 p-1`}
      >
        <span
          className="inline-block w-full h-full rounded-full"
          style={{ backgroundColor: bg }}
        />
      </span>
    </label>
  )
}
