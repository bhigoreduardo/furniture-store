/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import {
  ArrowsCounterClockwise,
  Heart,
  ShoppingCartSimple,
} from 'phosphor-react'
import { toast } from 'react-toastify'
import ReactStars from 'react-rating-stars-component'

import { currencyPrice, getBadgeColor } from '../../../../utils/format'
import { UserEnum } from '../../../../types/user-type'
import { patch } from '../../../../libs/fetcher'
import useApp from '../../../../hooks/use-app'
import useUser from '../../../../hooks/use-user'
import Badge from '../badge'
import Button from '../button/button'

export default function CardProduct({
  id,
  badge,
  badgeColor,
  reviewsAvg,
  reviews,
  name,
  cover,
  backCover,
  rangePrice,
  isAdmin = false,
}) {
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const { user, token, handleUpdateUser } = useUser()
  const isFavorite =
    user && user?._type === UserEnum.Customer
      ? user?.favorits.includes(id)
      : false
  const isCompare =
    user && user?._type === UserEnum.Customer
      ? user?.compare.includes(id)
      : false

  const handleProduct = async (endpoint) => {
    if (!user || !token || user._type !== UserEnum.Customer)
      return navigate('/entrar')
    const { user: userData, token: tokenData } = await patch(
      endpoint,
      { id: id },
      setIsLoading,
      toast
    )
    handleUpdateUser(userData, tokenData)
  }

  return (
    <article className="relative flex flex-col gap-1 p-2 border border-gray-100 rounded-sm hover:shadow-md hover:scale-105 duration-300 ease-in-out bg-white">
      {badge && (
        <Badge
          className={`absolute top-2 left-2 text-white uppercase ${getBadgeColor(
            badgeColor
          )}`}
          content={badge}
        />
      )}
      <div className="group relative flex items-center justify-center h-[240px] w-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${cover}`}
          alt={name}
          className="absolute left-0 group-hover:-left-[100%] h-full w-full object-cover duration-300 ease-in-out"
        />
        <img
          src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${backCover}`}
          alt={name}
          className="absolute -right-[100%] group-hover:right-0 h-full w-full object-cover duration-300 ease-in-out"
        />
        <div className="hidden absolute top-0 right-0 left-0 bottom-0 group-hover:flex items-center justify-center gap-2 bg-black w-full h-full bg-opacity-50 duration-300 ease-in-out">
          {!isAdmin && (
            <Button
              icon={<Heart size={16} />}
              onClick={() => handleProduct('/customers/toggle-favorite')}
              title="Favoritar"
              className={`${
                isFavorite
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-900'
              } hover:bg-orange-500 hover:text-white !w-10 !h-10 !p-0 !rounded-full`}
            />
          )}
          <Button
            icon={<ShoppingCartSimple size={16} />}
            onClick={() => navigate(`/produto/${id}`)}
            title="Visualizar"
            className="bg-white hover:bg-orange-500 text-gray-900 hover:text-white !w-10 !h-10 !p-0 !rounded-full"
          />
          {!isAdmin && (
            <Button
              icon={<ArrowsCounterClockwise size={16} />}
              onClick={() => handleProduct('/customers/toggle-compare')}
              title="Comparar"
              className={`${
                isCompare
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-900'
              } hover:bg-orange-500 hover:text-white !w-10 !h-10 !p-0 !rounded-full`}
            />
          )}
        </div>
      </div>
      {reviewsAvg !== undefined && reviews?.length !== 0 ? (
        <div className="flex items-center gap-1">
          <ReactStars
            count={5}
            size={12}
            value={reviewsAvg?.avg}
            edit={false}
            activeColor="#FA8232"
          />
          <span className="text-xs text-gray-400">({reviews?.length})</span>
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
