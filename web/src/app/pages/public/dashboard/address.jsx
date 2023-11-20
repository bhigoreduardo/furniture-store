import useUser from '../../../../hooks/use-user'
import CardAddress from '../../../components/ui/card/customer/card-address'

export default function Address() {
  const { user } = useUser()
  const address = user?.address

  return (
    <section className="flex-grow flex flex-col gap-6">
      <CardAddress address={address} to="/conta/configuracao" />
    </section>
  )
}
