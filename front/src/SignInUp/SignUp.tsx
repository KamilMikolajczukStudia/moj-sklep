import React, { ChangeEvent, FormEvent, useCallback, useState, useContext } from 'react'

import Box        from '@material-ui/core/Box'
import Link       from '@material-ui/core/Link'
import Grid       from '@material-ui/core/Grid'
import Paper      from '@material-ui/core/Paper'
import Button     from '@material-ui/core/Button'
import TextField  from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import styles           from './style'
import { HttpContext }  from "../Http"
import { User }         from '../User'
import Logo             from '../Logo'
import Footer           from './Footer'
import tlo              from '../img/welcome.jpg'
import { StateContext } from "../State"

interface ISuccessSignUp {
  data: User
  message: 'signup'
}

const useStyles = styles(tlo)

export function SignUp() {
  const { post } = useContext(HttpContext)
  const { goToSignIn } = useContext(StateContext)


  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(
    undefined as undefined | string,
  )
  const classes = useStyles()

  const handlerChangeLogin = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(undefined)
      setLogin(value)
    },
    [],
  )

  const handlerChangePassword = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(undefined)
      setPassword(value)
    },
    [],
  )

  const handlerSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await post<ISuccessSignUp>('/signup', {
          login,
          password,
        })

        goToSignIn()
      } catch (e) {
        setErrorMessage(e.message)
      }
    },
    [ login, password ],
  )

  return (
    <Grid container component="main" className={ classes.root }>
      <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
        <div className={ classes.paper }>
          <Logo className={ classes.logo }/>

          <Typography component="h1" variant="h5">
            Mój bank - Rejestracja
          </Typography>

          <form className={ classes.form } noValidate onSubmit={ handlerSubmit }>
            <TextField
              required
              fullWidth
              autoFocus
              value={ login }
              label="Login"
              margin="normal"
              variant="outlined"
              helperText={ errorMessage }
              onChange={ handlerChangeLogin }
              error={ errorMessage !== undefined }
            />

            <TextField
              required
              fullWidth
              label="Hasło"
              margin="normal"
              type="password"
              value={ password }
              variant="outlined"
              helperText={ errorMessage }
              onChange={ handlerChangePassword }
              error={ errorMessage !== undefined }
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              disabled={ login.length === 0 || password.length === 0 }
              className={ classes.submit }
            >
              Zaloguj
            </Button>

            <Grid container>
              <Link
                href="#"
                variant="body2"
                onClick={ goToSignIn }
                color="secondary"
                align="center"
              >
                Powrót do logowania
              </Link>
            </Grid>

            <Box mt={ 5 }>
              <Footer/>
            </Box>
          </form>
        </div>
      </Grid>

      <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }/>
    </Grid>
  )
}
