import React, { createContext, useState } from 'react'
import { isTimeMode } from './config/constants'

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [isPageAccount , setIsPageAccount] = useState(false)
  const [gameMode, setGameMode] = useState(isTimeMode)
  return (
    <AuthenticationContext.Provider value={{user,isLoggedIn,isPageAccount,gameMode,setUser,setGameMode,setIsPageAccount,setIsLoggedIn}}>
        {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext;
