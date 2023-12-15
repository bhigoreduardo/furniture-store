import FormUsers from '../../../components/ui/form/admin/form-users'
import useUser from '../../../../hooks/use-user'

export default function Form() {
  const { user } = useUser()
  const endPoint = `${user?._type}s`
  
  return (
    <section className="flex-grow flex flex-col">
      <FormUsers user={user} endPoint={endPoint} _type={user?._type} />
    </section>
  )
}
