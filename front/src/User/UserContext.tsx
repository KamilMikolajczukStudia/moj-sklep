import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { User }        from './User'
import { HttpContext } from '../Http'
import { useInit }     from '../utils'

import { IAuthAuth } from '../Imports'

interface IUserContextValue {
  isLogin: boolean
  user: User
  signOut: () => void
  signIn: (user: User) => void
  reload: (errorCallback?: () => void) => void
}

const defaultValue: IUserContextValue = {
  isLogin: false,
  signOut: () => {
  },
  signIn: () => {
  },
  reload: () => {
  },
  user: {
    id: -1,
    login: '-'
  },
}

export const UserContext = createContext<IUserContextValue>(defaultValue)

interface IUserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const { post, subscribeOnLogOut } = useContext(HttpContext)

  const [ isLogin, setIsLogin ] = useState(defaultValue.isLogin)
  const [ user, setUser ] = useState(defaultValue.user)

  const signOut = useCallback(() => {
    setUser(defaultValue.user)
    setIsLogin(false)
  }, [])

  useInit(() => subscribeOnLogOut(signOut))

  const signIn = useCallback((user: User) => {
    setUser(user)
    setIsLogin(true)
  }, [])

  const reload = useCallback((errorCallback?: () => void) => {
    async function CheckIsUserLogin() {
      try {
        const result = await post<IAuthAuth>('/auth/auth', undefined, false)

        if (result !== null) {
          const { data: newUser } = result

          signIn(newUser)
        } else if (errorCallback) {
          errorCallback()
        }
      } catch (e) {
        if (errorCallback) {
          errorCallback()
        }
      }
    }

    CheckIsUserLogin().then()
  }, [ signIn, post ])

  useInit(reload)

  return (
    <UserContext.Provider value={ { reload, signOut, signIn, isLogin, user } }>
      { children }
    </UserContext.Provider>
  )
}
