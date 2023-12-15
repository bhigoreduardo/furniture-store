import { useContext } from 'react'

import { UserContext } from '../app/contexts/user-context'
import { patch } from '../libs/fetcher'
import useApp from './use-app'
import { UserEnum } from '../types/user-type'

export default function useUser() {
  return useContext(UserContext)
}

export async function useHistory(id) {
  const { setIsLoading } = useApp()
  const { user, token, handleUpdateUser } = useUser()
  if (user && token && user?._type === UserEnum.Customer) {
    if (user.historyAvailable && id) {
      const today = new Date().toISOString().split('T')[0]
      if (
        Object.keys(user.history).includes(today) &&
        user.history[today].includes(id)
      )
        return

      const { user: userData, token: tokenData } = await patch(
        '/customers/update-history',
        { id: id },
        setIsLoading
      )
      handleUpdateUser(userData, tokenData)
    }
  }
}
