/* eslint-disable react/prop-types */
import ReactStars from 'react-rating-stars-component'

import { calculatePercentage } from '../../../../utils/format'

export default function ReviewCell({ stars, amount, totalAmount }) {
  const percentage = calculatePercentage(amount, totalAmount)
  
  return (
    <div className="flex items-center gap-4">
      <ReactStars
        count={5}
        size={18}
        value={stars}
        edit={false}
        activeColor="#FA8232"
      />
      <div className="flex-grow h-1 bg-gray-100 rounded-sm">
        <div className="bg-orange-500 h-full rounded-sm" style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{percentage}%</span>(
        {amount})
      </p>
    </div>
  )
}
