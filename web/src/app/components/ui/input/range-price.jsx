/* eslint-disable react/prop-types */
import { useState } from 'react'
import { currencyPrice } from '../../../../utils/format'

export default function RangePrice({ min, max }) {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)

  return (
    <div className="rangebox">
      <div className="values">
        <span>{currencyPrice.format(minValue)}</span>
        <span>{currencyPrice.format(maxValue)}</span>
      </div>

      <label className="range-label">
        <div className="slider-track" />
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          value={minValue}
          onChange={({ target: { value } }) => setMinValue(value)}
        />
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          value={maxValue}
          onChange={({ target: { value } }) => setMaxValue(value)}
        />
      </label>

      <div className="label-text">
        <span>Mínimo</span>
        <span>Máximo</span>
      </div>
    </div>
  )
}
