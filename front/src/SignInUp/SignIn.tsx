import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react'

import Box              from '@material-ui/core/Box'
import Grid             from '@material-ui/core/Grid'
import Link             from '@material-ui/core/Link'
import Paper            from '@material-ui/core/Paper'
import Button           from '@material-ui/core/Button'
import Checkbox         from '@material-ui/core/Checkbox'
import TextField        from '@material-ui/core/TextField'
import Typography       from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import styles                from './style'
import { HttpContext }       from "../Http"
import { User, UserContext } from '../User'
import Logo                  from '../Logo'
import Footer                from './Footer'
import tlo                   from '../img/your-money.jpg'
import { StateContext }      from "../State";

interface ISuccessLogin {
  data: User
  message: 'login'
}

const useStyles = styles(tlo)

export function SignIn() {
  const { signIn } = useContext(UserContext)
  const { post } = useContext(HttpContext)
  const { goToSignUp } = useContext(StateContext)

  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ rememberMe, setRememberMe ] = useState(false)
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

  const handlerChangeRememberMe = useCallback(
    (_, checked: boolean) => setRememberMe(!checked),
    [],
  )

  const handlerSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const result = await post<ISuccessLogin>('/signin', {
          login,
          password,
          rememberMe,
        }, false, true)

        if (result === null) {
          setErrorMessage('Błąd 2')
          return
        }

        const { data: user } = result

        signIn(user)
      } catch (e) {
        setErrorMessage(e.message)
      }
    },
    [ login, password, rememberMe, signIn ],
  )

  return (
    <Grid container component='main' className={ classes.root }>
      <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }/>

      <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
        <div className={ classes.paper }>
          <Logo className={ classes.logo }/>

          <Typography component='h1' variant='h5'>
            Mój bank - Logowanie
          </Typography>

          <form className={ classes.form } noValidate onSubmit={ handlerSubmit }>
            <TextField
              required
              fullWidth
              autoFocus
              value={ login }
              label='Login'
              margin='normal'
              variant='outlined'
              helperText={ errorMessage }
              onChange={ handlerChangeLogin }
              error={ errorMessage !== undefined }
            />

            <TextField
              required
              fullWidth
              label='Hasło'
              margin='normal'
              type='password'
              value={ password }
              variant='outlined'
              helperText={ errorMessage }
              onChange={ handlerChangePassword }
              error={ errorMessage !== undefined }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value={ rememberMe }
                  onChange={ handlerChangeRememberMe }
                  color='primary'
                />
              }
              label='Zapamiętaj logowanie na dłużej'
            />

            <Button
              fullWidth
              size='large'
              type='submit'
              color='primary'
              variant='contained'
              disabled={ login.length === 0 || password.length === 0 }
              className={ classes.submit }
            >
              Zaloguj
            </Button>

            <Grid container>
              <Link
                href='#'
                align='center'
                variant='body2'
                color='secondary'
                onClick={ goToSignUp }
              >
                Nie masz konta? Załóż je już w minutę i do tego <b>za darmo</b>!
              </Link>
            </Grid>

            <Box mt={ 5 }>
              <Footer/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
