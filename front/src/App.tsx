import React from 'react'

import { UserContextProvider } from './User'
import AppState from './AppState'
import { CssBaseline } from '@material-ui/core'

export default function App() {
  return (
    <UserContextProvider>
      <CssBaseline />

      <AppState />
    </UserContextProvider>
  )
}
