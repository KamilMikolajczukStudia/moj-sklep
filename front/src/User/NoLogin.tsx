import React, { useCallback, useState } from 'react'

import Tabs   from '@material-ui/core/Tabs'
import Tab    from '@material-ui/core/Tab'
import Box    from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'

import { If }     from '../utils'
import { Login }  from './Login'
import { SignUp } from './Register'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <If condition={ value === index } component="div" componentProps={ { hidden: value !== index } }>
      <Box p={ 3 }>
        { children }
      </Box>
    </If>
  );
}

export function NoLogin() {
  const [ tab, setTab ] = useState(0)

  const handleChange = useCallback((_, val: number) => {
    setTab(val)
  }, [])

  const handleGoToSignIn = useCallback(() => {
    setTab(0)
  }, [])

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs value={ tab } onChange={ handleChange } variant="fullWidth">
          <Tab label="Logowanie" />
          <Tab label="Rejestracja" />
        </Tabs>
      </AppBar>

      <TabPanel value={ tab } index={ 0 }>
        <Login />
      </TabPanel>

      <TabPanel value={ tab } index={ 1 }>
        <SignUp onSuccess={ handleGoToSignIn } />
      </TabPanel>
    </>
  )
}
