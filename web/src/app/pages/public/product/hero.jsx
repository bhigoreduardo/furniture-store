/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { ArrowsClockwise, Heart, ShoppingCartSimple } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReactStars from 'react-rating-stars-component'

import { parsedSelectData } from '../../../../utils/format'
import Slider from '../../../components/ui/slider'
import RadioBoxGroup from '../../../components/ui/input/radiobox-group'
import Count from '../../../components/ui/button/count'
import Button from '../../../components/ui/button/button'
import Container from '../../../components/ui/container'
import useApp from '../../../../hooks/use-app'
import RangePrice from '../../../components/ui/range-price'

export default function Hero({
  id,
  gallery,
  reviews,
  name,
  sku,
  status,
  brand,
  category,
  rangePrice,
  inventory,
}) {
  const [image, setImage] = useState('')
  const { payment, cartItems, handleCartItems } = useApp()
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { product: id, color: '', quantity: 1 },
    validationSchema: yup
      .object()
      .shape({ color: yup.string().required('Cor é obrigatório') }),
    onSubmit: (values) => handleUpdateCart(values),
  })
  const handleUpdateCart = (values) => {
    if (!cartItems?.length) {
      handleCartItems([values])
    } else {
      const findIndex = cartItems.findIndex(
        (item) => item.product === values.product && item.color === values.color
      )

      if (findIndex !== -1) {
        const quantity = cartItems[findIndex].quantity
        if (quantity + values.quantity > stock) {
          toast.error('Limite de estoque atingido')
          formik.resetForm()
          return
        }
        cartItems[findIndex].quantity += values.quantity
      } else cartItems.push(values)
      handleCartItems(cartItems)
    }
    toast.success('Produto adicionado ao carrinho')
    formik.resetForm()
  }
  const inventoryInfo = {
    ...inventory?.filter((item) => item.color._id === formik.values.color),
  }[0]
  const min = inventoryInfo?.offer?.offerPrice
  const max = inventoryInfo?.price
  const stock = inventoryInfo?.stock

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
            perView={6}
            loop={gallery?.length >= 7}
            // onSlideChange={(swiper) => setImage(gallery[swiper?.activeIndex])}
            // onSlideChange={(swiper) => console.log(swiper?.activeIndex)}
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
          {reviews !== undefined ? (
            <div className="flex items-center gap-1">
              <ReactStars
                count={5}
                size={20}
                value={reviews?.avg}
                edit={false}
                activeColor="#FA8232"
              />
              <span className="font-semibold text-sm text-gray-900">
                {reviews?.avg}
              </span>
              <span className="text-sm text-gray-400">
                ({reviews?.amount} Avaliações)
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Sem avaliações</span>
          )}
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

        <RangePrice
          rangePrice={
            typeof max === 'undefined' ? rangePrice : { max: max, min: min }
          }
        />

        <div className="flex flex-col gap-2">
          <RadioBoxGroup
            id="color"
            label="Cor"
            name="color"
            data={parsedColor}
            error={formik.touched?.color && formik.errors?.color}
            onChange={({ target: { value } }) =>
              formik.setFieldValue('color', value)
            }
            onBlur={formik.handleBlur}
          />
          {stock && (
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Unidades:</span> {stock}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Count
            stock={stock}
            formik={formik}
            value={formik.values.quantity}
            className="min-w-[160px]"
          />
          <Button
            label="Adicionar ao carrinho"
            icon={<ShoppingCartSimple size={20} className="text-white" />}
            onClick={formik.handleSubmit}
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
