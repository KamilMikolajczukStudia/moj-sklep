import React, {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useEffect
} from 'react'

import { http } from '../Http'
import { User } from './User'

interface IUserContextValue {
  loaded: boolean
  isLogin: boolean
  signOut: () => void
  signIn: (user: User) => void
  user: User
}

const defaultValue: IUserContextValue = {
  loaded: false,
  isLogin: false,
  signOut: () => {},
  signIn: (user: User) => {},
  user: {
    id: -1,
    login: '',
    money: 0,
    isAdmin: false
  }
}

export const UserContext = createContext<IUserContextValue>(defaultValue)

interface IUserContextProviderProps {
  children: ReactNode
}

interface ISuccessCheckLogin {
  data: User
  message: 'auth'
}

export function UserContextProvider({
  children
}: IUserContextProviderProps) {
  const [loaded, setLoaded] = useState(false)
  const [isLogin, setIsLogin] = useState(defaultValue.isLogin)
  const [user, setUser] = useState(defaultValue.user)

  const signOut = useCallback(() => {
    setUser(defaultValue.user)
    setIsLogin(false)
  }, [])

  const signIn = useCallback((user: User) => {
    setUser(user)
    setIsLogin(true)
  }, [])

  useEffect(() => {
    async function CheckIsUserLogin() {
      try {
        const { data: user } = await http<ISuccessCheckLogin>('/auth', 'post')

        signIn(user)
      } catch (e) {
      } finally {
        setLoaded(true)
      }
    }

    CheckIsUserLogin()
  }, [])

  return (
    <UserContext.Provider value={{ signOut, signIn, loaded, isLogin, user }}>
      {children}
    </UserContext.Provider>
  )
}
