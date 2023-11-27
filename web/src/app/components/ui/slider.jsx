/* eslint-disable react/prop-types */
import { useRef } from 'react'
import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'phosphor-react'

import 'swiper/css'
import 'swiper/css/navigation'

import Button from './button/button'
import { mergeClassName } from '../../../utils/format'

export default function Slider({
  perView = 7,
  width = 715,
  loop = true,
  onSlideChange,
  onActiveIndexChange,
  spaceBetween,
  className,
  children,
}) {
  const swiperRef = useRef()
  const calcSpaceBetween = Math.floor((width - 80 * perView) / (perView - 1))

  return (
    <div className={mergeClassName('relative', className)}>
      <Swiper
        ref={swiperRef}
        loop={loop}
        grabCursor={true}
        slidesPerView={perView}
        spaceBetween={spaceBetween || calcSpaceBetween}
        modules={[Navigation]}
        onSlideChange={onSlideChange}
        onActiveIndexChange={onActiveIndexChange}
        // onSlideChange={(swiper) => setImage(images[swiper?.activeIndex])}
        // onActiveIndexChange={(swiper) => console.log(swiper?.activeIndex)}
        // onSwiper={setSwiper}
        // onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      >
        {children(swiperRef)}
      </Swiper>
      {loop && (
        <>
          <Button
            icon={<ArrowLeft size={20} className="text-white" />}
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="absolute top-1/2 -translate-y-1/2 bg-orange-500 !p-1 !rounded-full -left-[15px] border-white hover:bg-orange-600 duration-300 ease-in-out z-10"
          />
          <Button
            icon={<ArrowRight size={20} className="text-white" />}
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="absolute top-1/2 -translate-y-1/2 -right-[15px] bg-orange-500 !p-1 !rounded-full border-white hover:bg-orange-600 duration-300 ease-in-out z-10"
          />
        </>
      )}
    </div>
  )
}
