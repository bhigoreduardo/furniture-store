import { useParams } from 'react-router-dom'

import { useUser } from '../../../../hooks/admin/use-user'
import FormUsers from '../../../components/ui/form/admin/form-users'

export default function Form() {
  const { id } = useParams()
  const user = useUser(id)
  const endPoint = id ? `users/update/${id}/admin` : 'users'

  return (
    <section className="flex-grow flex flex-col">
      <FormUsers user={user} isAdmin endPoint={endPoint} />
    </section>
  )
}
