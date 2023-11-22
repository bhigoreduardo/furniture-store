/* eslint-disable react/prop-types */
import ReactStars from 'react-rating-stars-component'

import { optionsFullLocaleDate } from '../../../../utils/format'

export default function CardReview({
  customer,
  stars,
  createdAt,
  description,
}) {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <div className="flex flex-col">
          <p className="flex items-center gap-1">
            <span className="font-semibold text-sm text-gray-900">
              {customer}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="text-xs">
              {new Date(createdAt).toLocaleDateString(
                'pt-BR',
                optionsFullLocaleDate(false)
              )}
            </span>
          </p>
          <ReactStars
            count={5}
            size={12}
            value={stars}
            edit={false}
            activeColor="#FA8232"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </article>
  )
}
