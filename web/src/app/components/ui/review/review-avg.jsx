/* eslint-disable react/prop-types */
import ReactStars from 'react-rating-stars-component'

import ReviewCell from './review-cell'

export default function ReviewAvg({ reviewAvg, reviewsAmount, starAmount }) {
  return (
    <article className="flex gap-6 items-center mx-auto">
      <div className="flex flex-col items-center gap-1 bg-yellow-100 rounded-sm py-6 px-8">
        <span className="font-semibold text-6xl text-gray-900">
          {reviewAvg}
        </span>
        <ReactStars
          count={5}
          size={24}
          value={reviewAvg}
          edit={false}
          activeColor="#FA8232"
        />
        <p className="flex items-center gap-1 text-base text-gray-600">
          <span className="font-semibold text-gray-900">
            Total de avaliações
          </span>
          ({reviewsAmount})
        </p>
      </div>
      <div className="flex flex-col gap-1 flex-grow min-w-[600px] max-w-[600px]">
        {Object.keys(starAmount).map((key, i) => (
          <ReviewCell
            key={i}
            stars={i + 1}
            amount={starAmount[key]}
            totalAmount={reviewsAmount}
          />
        ))}
      </div>
    </article>
  )
}
