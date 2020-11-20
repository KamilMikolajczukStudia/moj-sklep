import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { HttpContext }  from '../Http'
import { User }         from './User'
import { StateContext } from '../State'
import { useInit }      from '../utils'

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
    login: '-',
    limit: 0,
    money: 0,
    isAdmin: false,
    cardNumber: '0 000 000 000 000 000',
  },
}

export const UserContext = createContext<IUserContextValue>(defaultValue)

interface IUserContextProviderProps {
  children: ReactNode
}

interface ISuccessCheckLogin {
  data: User
  message: 'auth'
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const { post } = useContext(HttpContext)
  const { goToSignIn, goToContent } = useContext(StateContext)

  const [ isLogin, setIsLogin ] = useState(defaultValue.isLogin)
  const [ user, setUser ] = useState(defaultValue.user)

  const signOut = useCallback(() => {
    setUser(defaultValue.user)
    setIsLogin(false)
    goToSignIn()
  }, [ goToSignIn ])

  const signIn = useCallback((user: User) => {
    setUser(user)
    setIsLogin(true)
    goToContent()
  }, [ goToContent ])

  const reload = useCallback((errorCallback?: () => void) => {
    async function CheckIsUserLogin() {
      try {
        const result = await post<ISuccessCheckLogin>('/auth', undefined, false)

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
  }, [signIn, post])

  useInit(() => reload(goToSignIn))

  return (
    <UserContext.Provider value={ { reload, signOut, signIn, isLogin, user } }>
      { children }
    </UserContext.Provider>
  )
}
