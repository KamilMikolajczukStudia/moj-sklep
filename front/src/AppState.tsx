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

  const signIn = useCallback(() => {}, [])
  const signUp = useCallback(() => {}, [])

  useEffect(() => {
    if (loaded) {
      setState(isLogin ? States.content : States.signIn)
    }
  }, [loaded])

  return <>
  {state === States.load && <Load/>}
  {state === States.signIn && <SignIn signIn={signIn} />}
  {state === States.signUp && <SignUp signUp={signUp} />}
  {state === States.content && <Content />}
  </>
}
