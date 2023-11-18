import {
  Check,
  Handshake,
  Notepad,
  Package,
  Truck,
  WarningCircle,
} from 'phosphor-react'

export default function OrderProcess() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-fit flex items-center mx-auto">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 z-10 border-[2px] border-orange-500">
          <Check size={18} className="text-white" />
        </span>
        <span className="w-[200px] h-2 bg-orange-500 -ml-1" />
        <span className="w-6 h-6 rounded-full bg-orange-500 -ml-1 z-10 border-[2px] border-white"></span>
        <span className="w-[200px] h-2 bg-orange-100 -ml-1" />
        <span className="w-6 h-6 rounded-full bg-orange-100 -ml-1 z-10 border-[2px] border-orange-500"></span>
        <span className="w-[200px] h-2 bg-orange-100 -ml-1" />
        <span className="w-6 h-6 rounded-full bg-orange-100 -ml-1 z-10 border-[2px] border-orange-500"></span>
        <span className="w-[200px] h-2 bg-orange-100 -ml-1" />
        <span className="w-6 h-6 rounded-full bg-orange-100 -ml-1 z-10 border-[2px] border-orange-500"></span>
      </div>

      <div className="w-fit flex items-center gap-12">
        <span className="flex flex-col items-center gap-1 w-[170px]">
          <Notepad size={25} weight="duotone" className="text-blue-500" />
          <span className="font-semibold text-sm text-gray-600">
            Pedido criado
          </span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[170px]">
          <WarningCircle
            size={25}
            weight="duotone"
            className="text-purple-500"
          />
          <span className="font-semibold text-sm text-gray-600">Pendente</span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[170px]">
          <Package size={25} weight="duotone" className="text-orange-200" />
          <span className="font-semibold text-sm text-gray-200">Embalando</span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[170px]">
          <Truck size={25} weight="duotone" className="text-fuchsia-200" />
          <span className="font-semibold text-sm text-gray-200">
            Em trânsito
          </span>
        </span>

        <span className="flex flex-col items-center gap-1 w-[170px]">
          <Handshake size={25} weight="duotone" className="text-green-200" />
          <span className="font-semibold text-sm text-gray-200">Entregue</span>
        </span>
      </div>
    </div>
  )
}
