/* eslint-disable react/prop-types */
import { EyedropperSample } from 'phosphor-react'

import { mergeClassName } from '../../../../utils/format'

export default function Color({ id, name, className, ...props }) {
  return (
    <label
      className={mergeClassName(
        'relative flex items-center gap-1 py-2 px-4 bg-white border border-gray-300 rounded-sm',
        className
      )}
    >
      <EyedropperSample className="text-gray-400" />
      <span className="text-gray-400 text-sm">Selecione a cor</span>
      <input
        type="text"
        id={id}
        name={name}
        className="appearance-none border-none w-5 h-5 bg-transparent rounded-full color-swatch:rounded-full"
        {...props}
      />
    </label>
  )
}
