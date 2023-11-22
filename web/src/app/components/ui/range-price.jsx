/* eslint-disable react/prop-types */
import {
  currencyPrice,
  getBadgeColor,
  calculatePercentage,
} from '../../../utils/format'
import Badge from './badge'

export default function RangePrice({ rangePrice }) {
  return (
    <div className="flex items-center gap-2 font-normal text-2xl border-b border-gray-200 pb-4">
      {rangePrice?.max !== rangePrice?.min && (
        <span className="text-blue-500">
          {currencyPrice.format(rangePrice?.min)}
        </span>
      )}
      <span
        className={`${
          rangePrice?.max !== rangePrice?.min
            ? 'text-gray-400 line-through'
            : 'text-blue-500'
        } `}
      >
        {currencyPrice.format(rangePrice?.max)}
      </span>
      {rangePrice?.max !== rangePrice?.min && (
        <Badge
          className={`text-white uppercase ${getBadgeColor('yellow')}`}
          content={`${calculatePercentage(
            rangePrice?.min,
            rangePrice?.max
          )}% Off`}
        />
      )}
    </div>
  )
}
