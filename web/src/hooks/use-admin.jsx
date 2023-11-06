import { useContext } from 'react'

import { AdminContext } from '../app/contexts/admin-content'

export default function useAdmin() {
  return useContext(AdminContext)
}
