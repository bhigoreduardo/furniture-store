import { useContext } from 'react'

import { UserContext } from '../app/contexts/user-context'

export default function useUser() {
  return useContext(UserContext)
}
