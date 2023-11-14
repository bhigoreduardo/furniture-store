/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { ArrowsClockwise, Heart, ShoppingCartSimple } from 'phosphor-react'
import ReactStars from 'react-rating-stars-component'

import {
  currencyPrice,
  getBadgeColor,
  getPercentageDiscountPrice,
  parsedSelectData,
} from '../../../../utils/format'
import Slider from '../../../components/ui/slider'
import Badge from '../../../components/ui/badge'
import RadioBoxGroup from '../../../components/ui/input/radiobox-group'
import Count from '../../../components/ui/button/count'
import Button from '../../../components/ui/button/button'
import Container from '../../../components/ui/container'
import useApp from '../../../../hooks/use-app'

export default function Hero({
  gallery,
  name,
  sku,
  status,
  brand,
  category,
  rangePrice,
  inventory,
}) {
  const [image, setImage] = useState('')
  const { payment } = useApp()
  const parsedColor =
    inventory &&
    parsedSelectData(
      inventory.map((item) => item.color),
      '_id',
      'name',
      ['color']
    )
  useEffect(() => {
    if (gallery?.length > 0) setImage(gallery[0])
  }, [gallery])

  return (
    <Container className="grid grid-cols-2 gap-10">
      <div className="flex flex-col gap-4">
        <div className="w-full h-[450px] p-2 border border-gray-100 rounded-sm">
          <img
            src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${image}`}
            className="w-ful h-full object-contain"
          />
        </div>
        <div className="relative">
          <Slider
            loop={gallery?.length >= 7}
            onSlideChange={(swiper) => setImage(gallery[swiper?.activeIndex])}
            onActiveIndexChange={(swiper) => console.log(swiper?.activeIndex)}
          >
            {(swiperRef) =>
              gallery?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  value={i}
                  className="cursor-pointer"
                  onClick={() => {
                    swiperRef.current.swiper.slideToLoop(i)
                    swiperRef.current.activeIndex = i
                    setImage(gallery[i])
                  }}
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center justify-center h-20 w-20 p-1 border ${
                        isActive
                          ? 'border-orange-500 bg-gray-100'
                          : 'border-gray-100'
                      } rounded-sm duration-300 ease-in-out`}
                    >
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_PUBLIC_IMAGES
                        }/${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))
            }
          </Slider>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <ReactStars
              count={5}
              size={20}
              value={4.7}
              edit={false}
              activeColor="#FA8232"
            />
            <span className="font-semibold text-sm text-gray-900">4.7</span>
            <span className="text-sm text-gray-400">(13981 Avaliações)</span>
          </div>
          <h2 className="font-semibold text-xl text-gray-900">{name}</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="flex-1 font-semibold text-xs text-gray-900">
              <span className="font-normal text-gray-600">SKU:</span> {sku}
            </p>
            <p
              className={`flex-1 font-semibold text-xs ${
                status ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <span className="font-normal text-gray-500">Disponilidade:</span>{' '}
              {status ? 'Em estoque' : 'Fora de estoque'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="flex-1 font-semibold text-xs text-gray-900">
              <span className="font-normal text-gray-600">Marca:</span> {brand}
            </p>
            <p className="flex-1 font-semibold text-xs text-gray-900">
              <span className="font-normal text-gray-500">Categoria:</span>{' '}
              {category?.map((item, i) => (
                <Fragment key={item._id}>
                  {item.name}
                  {category?.length === i + 1 ? '' : '/'}
                </Fragment>
              ))}
            </p>
          </div>
        </div>

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
              content={`${getPercentageDiscountPrice(
                rangePrice.min,
                rangePrice.max
              )}% Off`}
            />
          )}
        </div>

        <RadioBoxGroup label="Cor" name="color" data={parsedColor} />

        <div className="flex gap-4">
          <Count className="min-w-[160px]" />
          <Button
            label="Adicionar ao carrinho"
            icon={<ShoppingCartSimple size={20} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 w-full"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-gray-900 hover:text-orange-500 duration-300 ease-in-out"
          >
            <Heart size={16} weight="duotone" />
            Adicionar aos favoritos
          </button>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-gray-900 hover:text-orange-500 duration-300 ease-in-out"
          >
            <ArrowsClockwise size={16} />
            Adicionar aos compare
          </button>
        </div>

        <div className="flex flex-col gap-3 border border-gray-100 p-5">
          <span className="text-sm text-gray-900">Formas de pagamento</span>
          <div className="flex items-center gap-1">
            {payment?.map((item) => (
              <img
                key={item._id}
                src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${
                  item.image
                }`}
                className="h-7 w-10 p-1 object-contain bg-gray-100 border border-gray-400 rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
