import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import logo from '../img/logo.svg'
import Footer from './Footer'
import useStyles from './style'

interface IRegisterProps {
  signIn: () => void
}

export default function Register({ signIn }: IRegisterProps) {
  const classes = useStyles()

  const handlerSubmit = useCallback(() => {}, [])

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt='' className={classes.logo} />

          <Typography component='h1' variant='h5'>
            Mój bank - Rejestracja
          </Typography>

          <form className={classes.form} noValidate onSubmit={handlerSubmit}>
            <TextField
              required
              fullWidth
              variant='outlined'
              margin='normal'
              label='Login'
              autoFocus
            />

            <TextField
              required
              fullWidth
              margin='normal'
              variant='outlined'
              label='Hasło'
              type='password'
            />

            <Button
              fullWidth
              type='submit'
              variant='contained'
              size='large'
              color='primary'
              className={classes.submit}
            >
              Rejestracja
            </Button>

            <Grid container>
              <Link href='#' variant='body2' onClick={signIn} align='center'>
                Powrót do logowania
              </Link>
            </Grid>

            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  )
}
