import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('')

  function login() {
    const name = window.prompt('Enter your name')
    if (name && name.trim()) setUserName(name.trim())
  }

  function logout() {
    setUserName('')
  }

  return (
    <UserContext.Provider value={{ userName, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
