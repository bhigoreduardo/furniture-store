/* eslint-disable react/prop-types */
import { Eye, Heart, ShoppingCartSimple } from 'phosphor-react'
import ReactStars from 'react-rating-stars-component'

import { currencyPrice, getBadgeColor } from '../../../../utils/format'
import Badge from '../badge'
import Button from '../button/button'

export default function CardProduct({
  badge,
  badgeColor,
  reviews,
  name,
  rangePrice,
}) {
  return (
    <article className="relative flex flex-col gap-1 p-2 border border-gray-100 rounded-sm hover:shadow-md hover:scale-105 duration-300 ease-in-out">
      {badge && (
        <Badge
          className={`absolute top-2 left-2 text-white uppercase ${getBadgeColor(
            badgeColor
          )}`}
          content={badge}
        />
      )}
      <div className="group relative flex items-center justify-center h-[180px] w-full">
        <img
          src="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          alt="Imagem"
          className="h-full w-fit object-cover"
        />
        <div className="hidden absolute top-0 right-0 left-0 bottom-0 group-hover:flex items-center justify-center gap-2 bg-black w-full h-full bg-opacity-20 duration-300 ease-in-out">
          <Button
            icon={<Heart size={16} className="!transition-all !duration-0" />}
            className="bg-white hover:bg-orange-500 text-gray-900 hover:text-white !w-10 !h-10 !p-0 !rounded-full"
          />
          <Button
            icon={
              <ShoppingCartSimple
                size={16}
                className="!transition-all !duration-0"
              />
            }
            className="bg-white hover:bg-orange-500 text-gray-900 hover:text-white !w-10 !h-10 !p-0 !rounded-full"
          />
          <Button
            icon={<Eye size={16} className="!transition-all !duration-0" />}
            className="bg-white hover:bg-orange-500 text-gray-900 hover:text-white !w-10 !h-10 !p-0 !rounded-full"
          />
        </div>
      </div>
      {reviews !== undefined ? (
        <div className="flex items-center gap-1">
          <ReactStars
            count={5}
            size={12}
            value={reviews?.avg}
            edit={false}
            activeColor="#FA8232"
          />
          <span className="text-xs text-gray-400">({reviews?.amount})</span>
        </div>
      ) : (
        <span className="text-xs text-gray-400">Sem avaliações</span>
      )}
      <h3 className="text-sm text-gray-900 line-clamp-2">{name}</h3>
      <div className="flex items-center gap-1">
        <span
          className={`text-sm ${
            rangePrice?.max !== rangePrice?.min
              ? 'text-gray-400 line-through'
              : 'text-blue-500'
          } `}
        >
          {currencyPrice.format(rangePrice?.max)}
        </span>
        {rangePrice?.max !== rangePrice?.min && (
          <span className="text-sm text-blue-500">
            {currencyPrice.format(rangePrice?.min)}
          </span>
        )}
      </div>
    </article>
  )
}
