import { ArrowRight, Package, Receipt, Rocket } from 'phosphor-react'
import { Link, useNavigate } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'

import {
  useFilterOrders,
  useOrdersAnalytics,
} from '../../../../hooks/use-order'
import { orderColumns } from '../../../../utils/constants/public'
import { OrderStatusEnumType } from '../../../../types/enum-type'
import { useLastHistory } from '../../../../hooks/use-product'
import useUser from '../../../../hooks/use-user'
import CardOverview from '../../../components/ui/card/card-overview'
import CardProfile from '../../../components/ui/card/customer/card-profile'
import CardAddress from '../../../components/ui/card/customer/card-address'
import TableData from '../../../components/ui/table/table-data'
import Button from '../../../components/ui/button/button'
import CardProduct from '../../../components/ui/card/card-product'
import Heading from '../../../components/ui/heading'
import Slider from '../../../components/ui/slider'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { docs: orders } = useFilterOrders()
  const ordersAnalytics = useOrdersAnalytics()
  const lastHistory = useLastHistory()
  const address = user?.address

  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h4 className="text-xl text-gray-900">Olá, {user?.name}</h4>
        <p className="text-sm text-gray-700">
          No painel da sua conta. você pode verificar e visualizar facilmente
          seus{' '}
          <Link to="pedidos" className="text-blue-500">
            pedidos
          </Link>{' '}
          recentes, gerenciar seus{' '}
          <Link to="endereco" className="text-blue-500">
            endereços
          </Link>{' '}
          de envio e cobrança e editar sua{' '}
          <Link to="configuracao" className="text-blue-500">
            senha
          </Link>{' '}
          e configurações da{' '}
          <Link to="configuracao" className="text-blue-500">
            conta
          </Link>
          .
        </p>
      </div>

      <div className="flex gap-6">
        <CardProfile user={user} to="configuracao" />
        <CardAddress address={address} to="configuracao" />
        <div className="flex-1 flex flex-col gap-6">
          <CardOverview
            icon={<Rocket size={20} className="text-blue-500" />}
            value={ordersAnalytics?.length}
            description="Total Pedidos"
            className="bg-blue-50"
          />
          <CardOverview
            icon={<Receipt size={20} className="text-orange-500" />}
            value={
              ordersAnalytics?.filter(
                (item) =>
                  item.status?.slice(-1)[0]?.history ===
                  OrderStatusEnumType.Pending
              )?.length
            }
            description="Pedidos Pendetes"
            className="bg-orange-50"
          />
          <CardOverview
            icon={<Package size={20} className="text-green-500" />}
            value={
              ordersAnalytics?.filter(
                (item) =>
                  item.status?.slice(-1)[0]?.history ===
                  OrderStatusEnumType.Delivered
              )?.length
            }
            description="Pedidos Entregue"
            className="bg-green-50"
          />
        </div>
      </div>

      <TableData
        title="Pedidos recentes"
        btn={
          <Button
            label="Vê todos"
            icon={<ArrowRight size={14} />}
            className="!gap-1 font-semibold text-sm text-orange-500 hover:bg-orange-500 hover:text-white !py-2 normal-case"
            onClick={() => navigate('/conta/pedidos')}
          />
        }
        columns={orderColumns('/conta/pedidos')}
        data={orders}
      />

      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Histórico"
          btn={
            <Button
              label="Vê todos"
              icon={<ArrowRight size={14} />}
              className="!gap-1 font-semibold text-sm text-orange-500 hover:bg-orange-500 hover:text-white !py-2 normal-case"
              onClick={() => navigate('/conta/historico')}
            />
          }
        />
        {lastHistory?.length > 0 ? (
          <Slider perView={4} spaceBetween={24} className="px-6">
            {({ swiperRef }) =>
              lastHistory?.map((item) => (
                <SwiperSlide
                  key={item._id}
                  value={item._id}
                  className="cursor-pointer"
                  onClick={() => {
                    swiperRef.current.swiper.slideToLoop(item._id)
                    swiperRef.current.activeIndex = item._id
                  }}
                >
                  <CardProduct
                    id={item?._id}
                    reviewsAvg={item?.reviewsAvg}
                    reviews={item?.reviews}
                    name={item?.name}
                    cover={item?.productData?.media?.cover}
                    backCover={item?.productData?.media?.backCover}
                    rangePrice={item?.rangePrice}
                  />
                </SwiperSlide>
              ))
            }
          </Slider>
        ) : (
          <span className="text-sm text-gray-600 text-left px-6">
            Sem resultados
          </span>
        )}
      </div>
    </section>
  )
}
