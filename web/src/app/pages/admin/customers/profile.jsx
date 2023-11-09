import { useParams } from 'react-router-dom'
import { Package, Receipt, Rocket } from 'phosphor-react'

import { useCustomer } from '../../../../hooks/admin/use-customer'
import CardOverview from '../../../components/ui/card/card-overview'
import CardAddress from '../../../components/ui/card/customer/card-address'
import CardProfile from '../../../components/ui/card/customer/card-profile'

export default function Profile() {
  const { id } = useParams()
  const customer = useCustomer(id)
  const address = customer.address

  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex gap-6">
        <CardProfile user={customer} to="editar" />
        <CardAddress address={address} to="editar" />
        <div className="flex-1 flex flex-col gap-6">
          <CardOverview
            icon={<Rocket size={20} className="text-blue-500" />}
            value="154"
            description="Total Pedidos"
            className="bg-blue-50"
          />
          <CardOverview
            icon={<Receipt size={20} className="text-orange-500" />}
            value="154"
            description="Pedidos Pendetes"
            className="bg-orange-50"
          />
          <CardOverview
            icon={<Package size={20} className="text-green-500" />}
            value="154"
            description="Pedidos Entregue"
            className="bg-green-50"
          />
        </div>
      </div>
    </section>
  )
}
