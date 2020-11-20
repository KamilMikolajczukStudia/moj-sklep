import React, { useContext } from 'react'

import Load                     from '../Load'
import Content                  from '../Content'
import { SignIn, SignUp }       from '../SignInUp'
import { StateContext, States } from './StateContext'

export function StateRouter() {
  const { state } = useContext(StateContext)

  return (
    <>
      { state === States.load && <Load /> }
      { state === States.signIn && <SignIn /> }
      { state === States.signUp && <SignUp /> }
      { state === States.content && <Content /> }
    </>
  )
}
