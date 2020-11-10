import React, { useCallback, useState } from 'react'

import SignIn from './SignIn'
import Register from './SignIn/Register'

enum AppStates { user, signIn, register }

function ApplicationState() {
  const [state, setState] = useState(AppStates.signIn)

  const loginUser = useCallback((token: string) => {
    setState(AppStates.user)
  }, [])

  const signIn = useCallback(() => {
    setState(AppStates.signIn)
  }, [])

  const register = useCallback(() => {
    setState(AppStates.register)
  }, [])

  switch(state) {
    case AppStates.signIn:
      return <SignIn register={register} />
    case AppStates.register:
      return <Register signIn={signIn} />
    default:
      return null
  }
}

function App() {
  return (
    <ApplicationState></ApplicationState>
    
  )
}

export default App
