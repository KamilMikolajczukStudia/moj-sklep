import React, { createContext, useCallback, useState, ReactNode } from 'react'

export enum States {
  load,
  content,
  signIn,
  signUp,
}

interface IStateContextValue {
  state: States
  goToSignIn: () => void
  goToSignUp: () => void
  goToContent: () => void
  goToLoad: () => void
}

const defaultValue: IStateContextValue = {
  state: States.load,
  goToSignIn: () => null,
  goToSignUp: () => null,
  goToContent: () => null,
  goToLoad: () => null,
}

export const StateContext = createContext<IStateContextValue>(defaultValue)

interface IStateContextProviderProps {
  children: ReactNode
}

export function StateContextProvider({ children }: IStateContextProviderProps) {
  const [ state, setState ] = useState(defaultValue.state)

  const goToSignIn = useCallback(() => setState(States.signIn), [])
  const goToSignUp = useCallback(() => setState(States.signUp), [])
  const goToContent = useCallback(() => setState(States.content), [])
  const goToLoad = useCallback(() => setState(States.load), [])

  return (
    <StateContext.Provider value={ { goToSignIn, goToContent, goToLoad, goToSignUp, state } }>
      { children }
    </StateContext.Provider>
  )
}
