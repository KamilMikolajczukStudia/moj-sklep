import React, { createContext, ReactNode, useCallback, useContext } from 'react'
import { StateContext }                                             from "../State";

const server = "http://localhost:3333"

const http = (method: 'get' | 'post' | 'put' | 'delete', signOutCallBack: () => void,
) => async function <T>(
  url: string,
  body?: any,
  useCallback = true,
  giveErrorMessage = false
) {
  try {
    const response = await fetch(`${ server }${ url }`, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (!response.ok) {
      if (response.status === 401 && useCallback) {
        // Session finished
        signOutCallBack()
      }

      if (giveErrorMessage) {
        throw new Error((await response.json()).message)
      }

      return null
    }

    return await response.json() as T
  } catch (e) {

    if (giveErrorMessage) {
      throw new Error(e)
    }

    console.error(`Fetch error`, e)

    return null
  }
}

type THttpFn = <T>(
  url: string,
  body?: any,
  useCallback?: boolean,
  giveError?: boolean
) => Promise<T | null>


interface IHttpContextValue {
  get: THttpFn
  post: THttpFn
  put: THttpFn
  delete: THttpFn
}

const defaultValue: IHttpContextValue = {
  get: async () => null,
  post: async () => null,
  put: async () => null,
  delete: async () => null,
}

export const HttpContext = createContext<IHttpContextValue>(defaultValue)

interface IHttpContextProviderProps {
  children: ReactNode
}

export function HttpContextProvider({ children }: IHttpContextProviderProps) {
  const { goToSignIn } = useContext(StateContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const get = useCallback(http('get', goToSignIn), [ goToSignIn ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const post = useCallback(http('post', goToSignIn), [ goToSignIn ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const put = useCallback(http('put', goToSignIn), [ goToSignIn ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteFn = useCallback(http('delete', goToSignIn), [ goToSignIn ])

  return (
    <HttpContext.Provider value={ { get, post, put, delete: deleteFn } }>
      { children }
    </HttpContext.Provider>
  )
}
