import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import {
  ArrowLeft,
  ArrowRight,
  ArrowsClockwise,
  Heart,
  ShoppingCartSimple,
} from 'phosphor-react'
import ReactStars from 'react-rating-stars-component'

import 'swiper/css'
import 'swiper/css/navigation'

import {
  createEmptyArr,
  currencyPrice,
  getBadgeColor,
} from '../../../../utils/format'
import Container from '../../../components/ui/container'
import Button from '../../../components/ui/button/button'
import Badge from '../../../components/ui/badge'
import SelectLabel from '../../../components/ui/input/select-label'
import RadioBoxGroup from '../../../components/ui/input/radiobox-group'
import Breadcrumb from '../../../components/ui/breadcrumb'
import Count from '../../../components/ui/button/count'
import Tab from '../../../components/ui/button/tab'

const rangePrice = { min: 542.12, max: 842.12 }
const images = [
  'https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png',
  'https://estofadosedecor.com.br/painel/assets/upload_produto/p_199/cadeira-de-jantar-com-bracos-madeira-e-estofado-atena-5ff4b83e4b0b74974e61057e56d46f85.png',
  'https://cdn.dooca.store/2436/products/cadeira-torino-baixa.png?v=1616266108',
  'https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png',
  'https://estofadosedecor.com.br/painel/assets/upload_produto/p_199/cadeira-de-jantar-com-bracos-madeira-e-estofado-atena-5ff4b83e4b0b74974e61057e56d46f85.png',
  'https://cdn.dooca.store/2436/products/cadeira-torino-baixa.png?v=1616266108',
  'https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png',
  'https://estofadosedecor.com.br/painel/assets/upload_produto/p_199/cadeira-de-jantar-com-bracos-madeira-e-estofado-atena-5ff4b83e4b0b74974e61057e56d46f85.png',
  'https://cdn.dooca.store/2436/products/cadeira-torino-baixa.png?v=1616266108',
]
const data = [
  { _id: '12313asd', name: 'Preto', color: '#000' },
  { _id: '12313asqwed', name: 'Branco', color: '#fff' },
  { _id: '12313123qwed', name: 'Cinza', color: '#ccc' },
]

export default function Product() {
  const [image, setImage] = useState('')
  const swiperRef = useRef()
  const perView = 7
  const width = 715
  const spaceBetween = Math.floor((width - 80 * perView) / (perView - 1))

  const [tabInformation, setTabInformation] = useState('description')
  const getActiveTab = (tab) => tab === tabInformation
  return (
    <section className="flex flex-col gap-10">
      <Breadcrumb />
      <Container className="flex flex-col gap-10">
        <section className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="w-full h-[450px] p-2 border border-gray-100 rounded-sm">
              <img src={image} className="w-ful h-full object-contain" />
            </div>
            <div className="relative">
              <Swiper
                ref={swiperRef}
                loop={true}
                grabCursor={true}
                slidesPerView={perView}
                spaceBetween={spaceBetween}
                modules={[Navigation]}
                onSlideChange={(swiper) =>
                  setImage(images[swiper?.activeIndex])
                }
                // onActiveIndexChange={(swiper) => console.log(swiper?.activeIndex)}
                // onSwiper={setSwiper}
                // onBeforeInit={(swiper) => (swiperRef.current = swiper)}
              >
                {images?.map((item, i) => (
                  <SwiperSlide
                    key={i}
                    value={i}
                    className="cursor-pointer"
                    onClick={() => {
                      swiperRef.current.swiper.slideToLoop(i)
                      swiperRef.current.activeIndex = i
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
                          src={item}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
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
                <span className="text-sm text-gray-400">
                  (13981 Avaliações)
                </span>
              </div>
              <h2 className="font-semibold text-xl text-gray-900">
                Cadeira Comfory Meryl Lounge
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="flex-1 font-semibold text-xs text-gray-900">
                  <span className="font-normal text-gray-600">SKU:</span>{' '}
                  A264671
                </p>
                <p className="flex-1 font-semibold text-xs text-green-500">
                  <span className="font-normal text-gray-500">
                    Disponilidade:
                  </span>{' '}
                  Em estoque
                </p>
              </div>
              <div className="flex justify-between">
                <p className="flex-1 font-semibold text-xs text-gray-900">
                  <span className="font-normal text-gray-600">Marca:</span>{' '}
                  Comforty
                </p>
                <p className="flex-1 font-semibold text-xs text-gray-900">
                  <span className="font-normal text-gray-500">Categoria:</span>{' '}
                  Cadeiras/Ergônomica
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
              <Badge
                className={`text-white uppercase ${getBadgeColor('yellow')}`}
                content="21% Off"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 flex flex-col">
                <RadioBoxGroup label="Cor" name="color" data={data} />
              </div>
              <div className="flex-1">
                <SelectLabel
                  id="size"
                  label="Tamanho"
                  name="size"
                  placeholder="Selecione"
                  data={[]}
                  className="flex-grow"
                />
              </div>
            </div>

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
                {createEmptyArr(5)?.map((i) => (
                  <img
                    key={i}
                    src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
                    className="h-7 w-fit p-1 object-contain bg-gray-100 border border-gray-400 rounded-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
      <Container className="flex flex-col gap-10">
        <div className="flex items-center justify-center border border-gray-100">
          <Tab
            label="Descrição"
            className="uppercase !px-6"
            active={getActiveTab('description')}
            onClick={() => setTabInformation('description')}
          />
          <Tab
            label="Informações adicionais"
            className="uppercase !px-6"
            active={getActiveTab('additional')}
            onClick={() => setTabInformation('additional')}
          />
          <Tab
            label="Especificações"
            className="uppercase !px-6"
            active={getActiveTab('specification')}
            onClick={() => setTabInformation('specification')}
          />
          <Tab
            label="Avaliações"
            className="uppercase !px-6"
            active={getActiveTab('reviews')}
            onClick={() => setTabInformation('reviews')}
          />
        </div>
      </Container>
    </section>
  )
}
