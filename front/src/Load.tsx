import React                             from 'react'
import Grid                              from '@material-ui/core/Grid'
import { makeStyles, Paper, Typography } from '@material-ui/core'

import Logo from './Logo'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  center: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 64,
  },
  logo: {
    marginBottom: 16,
    width: 128,
  },
}))

export default function Load() {
  const classes = useStyles()

  return (
    <Grid container component='main' className={ classes.root }>
      <Paper classes={ { root: classes.center } }>
        <Logo className={ classes.logo } />

        <Typography variant='h2'>Ładowanie</Typography>
      </Paper>
    </Grid>
  )
}
