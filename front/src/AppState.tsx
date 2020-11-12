import React, { useState, useCallback, useEffect, useContext } from 'react'

import Load from './Load'
import Content from './Content'
import { UserContext } from './User'
import { SignIn, SignUp } from './SignInUp'

enum States {
  load,
  content,
  signIn,
  signUp
}

export default function AppState() {
  const { loaded, isLogin } = useContext(UserContext)

  const [state, setState] = useState(States.load)

  const goTSsignIn = useCallback(() => setState(States.signIn), [])
  const goToSignUp = useCallback(() => setState(States.signUp), [])

  useEffect(() => {
    if (loaded) {
      setState(isLogin ? States.content : States.signIn)
    }
  }, [loaded])

  useEffect(() => {
    const newState = isLogin ? States.content : States.signIn

    if (loaded && state !== newState) {
      setState(newState)
    }
  }, [isLogin, loaded])

  return (
    <>
      {state === States.load && <Load />}
      {state === States.signIn && <SignIn goToSignUp={goToSignUp} />}
      {state === States.signUp && <SignUp goTSsignIn={goTSsignIn} />}
      {state === States.content && <Content />}
    </>
  )
}
