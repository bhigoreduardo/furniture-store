/* eslint-disable react/prop-types */
import {
  Check,
  Handshake,
  Notepad,
  Package,
  Truck,
  WarningCircle,
  CheckCircle,
} from 'phosphor-react'

import { OrderStatusEnumType } from '../../../types/enum-type'

export default function OrderProcess({ status }) {
  let index = 1
  Object.values(OrderStatusEnumType).forEach((item, i) => {
    if (item === status) index += i
  })
  const getBulletClassName = (key) => {
    if (key < index) return 'bg-orange-500 border-orange-500'
    else if (key === index) return 'bg-orange-500 border-white'
    return 'bg-orange-100 border-orange-500'
  }
  const getBarClassName = (key) => {
    if (key < index) return 'bg-orange-500'
    return 'bg-orange-100'
  }
  const getNumberIconClassName = (key) => {
    if (key <= index) return 500
    return 200
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-fit flex items-center mx-auto">
        <span className={`flex items-center justify-center w-6 h-6 rounded-full z-10 border-[2px] ${getBulletClassName(0)}`}>
          {index > 0 && <Check size={18} className="text-white" />}
        </span>
        <span className={`w-[130px] h-2 -ml-1 ${getBarClassName(0)}`} />
        <span className={`flex items-center justify-center w-6 h-6 rounded-full -ml-1 z-10 border-[2px] ${getBulletClassName(1)}`}>
          {index > 1 && <Check size={18} className="text-white" />}
        </span>
        <span className={`w-[130px] h-2 -ml-1 ${getBarClassName(1)}`} />
        <span className={`flex items-center justify-center w-6 h-6 rounded-full -ml-1 z-10 border-[2px] ${getBulletClassName(2)}`}>
          {index > 2 && <Check size={18} className="text-white" />}
        </span>
        <span className={`w-[130px] h-2 -ml-1 ${getBarClassName(2)}`} />
        <span className={`flex items-center justify-center w-6 h-6 rounded-full -ml-1 z-10 border-[2px] ${getBulletClassName(3)}`}>
          {index > 3 && <Check size={18} className="text-white" />}
        </span>
        <span className={`w-[130px] h-2 -ml-1 ${getBarClassName(3)}`} />
        <span className={`flex items-center justify-center w-6 h-6 rounded-full -ml-1 z-10 border-[2px] ${getBulletClassName(4)}`}>
          {index > 4 && <Check size={18} className="text-white" />}
        </span>
        <span className={`w-[130px] h-2 -ml-1 ${getBarClassName(4)}`} />
        <span className={`flex items-center justify-center w-6 h-6 rounded-full -ml-1 z-10 border-[2px] ${getBulletClassName(5)}`}>
          {index > 5 && <Check size={18} className="text-white" />}
        </span>
      </div>

      <div className="w-fit flex items-center gap-12">
        <span className="flex flex-col items-center gap-1 w-[100px]">
          <Notepad size={25} weight="duotone" className={`text-blue-${getNumberIconClassName(0)}`} />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(0)}`}>
            Pedido criado
          </span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[100px]">
          <WarningCircle
            size={25}
            weight="duotone"
            className={`text-purple-${getNumberIconClassName(1)}`}
          />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(1)}`}>Pendente</span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[100px]">
          <CheckCircle size={25} weight="duotone" className={`text-lime-${getNumberIconClassName(2)}`} />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(2)}`}>Pago</span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[100px]">
          <Package size={25} weight="duotone" className={`text-orange-${getNumberIconClassName(3)}`} />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(3)}`}>Embalando</span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[100px]">
          <Truck size={25} weight="duotone" className={`text-fuchsia-${getNumberIconClassName(4)}`} />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(4)}`}>
            Em trânsito
          </span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[100px]">
          <Handshake size={25} weight="duotone" className={`text-green-${getNumberIconClassName(5)}`} />
          <span className={`font-semibold text-sm text-gray-${getNumberIconClassName(5)}`}>Entregue</span>
        </span>
      </div>
    </div>
  )
}
