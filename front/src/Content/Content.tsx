import React, { ChangeEvent, MouseEvent, useCallback, useContext, useState } from 'react'
import SwipeableViews                                                        from 'react-swipeable-views'

import Tab                                 from '@material-ui/core/Tab'
import Tabs                                from '@material-ui/core/Tabs'
import Paper                               from '@material-ui/core/Paper'
import AppBar                              from '@material-ui/core/AppBar'
import Toolbar                             from '@material-ui/core/Toolbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IconButton                          from '@material-ui/core/IconButton'
import Typography                          from '@material-ui/core/Typography'
import useTheme                            from '@material-ui/core/styles/useTheme'
import PowerSettingsNewIcon                from '@material-ui/icons/PowerSettingsNew'

import Logo     from '../Logo'
import Transfer from '../Transfer'
import TabPanel from './TabPanel'
import { UserContext } from '../User'
import { HttpContext } from "../Http"
import MyAccount       from '../MyAccount'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 24,
      marginTop: 12,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    views: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      '& .react-swipeable-view-container': {
        flex: 1
      }
    }
  }),
)

export default function Content() {
  const classes = useStyles()
  const theme = useTheme()
  const { signOut } = useContext(UserContext)
  const { post } = useContext(HttpContext)

  const [ tab, setTab ] = useState(0)

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )

  const handleSignOut = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      signOut()
      post<never>('/signout').then()
    },
    [ post, signOut ],
  )

  const handleChangeIndex = useCallback((index: number) => {
    setTab(index)
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo className={ classes.logo } />

          <Typography variant="h6" className={ classes.title }>
            Mój bank
          </Typography>

          <IconButton onClick={ handleSignOut } color="inherit" title="Wyloguj">
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper elevation={ 4 } square>
        <Tabs value={ tab } onChange={ handleChange }>
          <Tab label="Moje konto" />
          <Tab label="Super przelew" />
        </Tabs>
      </Paper>

      <SwipeableViews
        index={ tab }
        className={ classes.views }
        onChangeIndex={ handleChangeIndex }
        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
      >
        <TabPanel value={ tab } index={ 0 } dir={ theme.direction }>
          <MyAccount />
        </TabPanel>

        <TabPanel value={ tab } index={ 1 } dir={ theme.direction }>
          <Transfer />
        </TabPanel>
      </SwipeableViews>
    </>
  )
}
