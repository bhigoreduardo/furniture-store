/* eslint-disable react/prop-types */
import { createContext } from 'react'
import useLocalStorage from '../../hooks/use-localStorage'

export const UserContext = createContext({
  user: null,
  token: null,
})

export default function UserContextProvider({ children }) {
  const { value: user, handleUpdate: handleUser } = useLocalStorage(
    'user',
    null
  )
  const { value: token, handleUpdate: handleToken } = useLocalStorage(
    'token',
    null
  )
  const handleUpdateUser = (userData, tokenData) => {
    handleUser(userData)
    handleToken(tokenData)
  }

  return (
    <UserContext.Provider value={{ user, token, handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  )
}
