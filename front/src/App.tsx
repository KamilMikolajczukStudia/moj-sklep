import React, {} from 'react'

import { CssBaseline } from "@material-ui/core"

import { UserContextProvider }               from './User'
import { HttpContextProvider }               from './Http'
import { StateContextProvider, StateRouter } from './State'


export default function App() {
  return (
    <CssBaseline>
      <StateContextProvider>
        <HttpContextProvider>
          <UserContextProvider>
            <StateRouter/>
          </UserContextProvider>
        </HttpContextProvider>
      </StateContextProvider>
    </CssBaseline>
  )
}
