import { useParams, useLocation } from 'react-router-dom'

import { useUser } from '../../../../hooks/admin/use-user'
import FormUsers from '../../../components/ui/form/admin/form-users'

export default function Form() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const _type =
    pathname.split('/')[3] === 'administradores' ? 'admin' : 'employee'
  const user = useUser(`${_type}s`, id)
  const endPoint = id ? `${_type}s` : 'auth/save'

  return (
    <section className="flex-grow flex flex-col">
      <FormUsers user={user} isAdmin endPoint={endPoint} _type={_type} />
    </section>
  )
}
