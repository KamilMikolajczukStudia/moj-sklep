import React, { useCallback, useState } from 'react'

import { SignIn, Register } from './SigninAndRegister'
import { User } from './User'

enum AppStates {
  user,
  signIn,
  register
}

function ApplicationState() {
  const [state, setState] = useState(AppStates.signIn)

  const loginUser = useCallback((user: User) => {
    setState(AppStates.user)
  }, [])

  const signIn = useCallback(() => {
    setState(AppStates.signIn)
  }, [])

  const register = useCallback(() => {
    setState(AppStates.register)
  }, [])

  switch (state) {
    case AppStates.signIn:
      return <SignIn register={register} />
    case AppStates.register:
      return <Register signIn={signIn} />
    default:
      return null
  }
}

function App() {
  return <ApplicationState></ApplicationState>
}

export default App
