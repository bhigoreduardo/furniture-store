/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const UserContext = createContext({
  user: null,
  token: null,
})

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage?.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  const [token, setToken] = useState(
    localStorage?.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null
  )
  const handleUpdateUser = (user, token) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
  }

  return (
    <UserContext.Provider value={{ user, token, handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  )
}
