import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme }                                  from '@material-ui/core/styles'

import Button           from "@material-ui/core/Button"
import Checkbox         from "@material-ui/core/Checkbox"
import TextField        from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { HttpContext } from "../Http"
import { UserContext } from '../User'

import { IAuthSignIn } from '../Imports'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submit: {
      marginTop: theme.spacing(2)
    },
  }),
)

export function Login() {
  const classes = useStyles()

  const { signIn } = useContext(UserContext)
  const { post } = useContext(HttpContext)

  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ rememberMe, setRememberMe ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(
    undefined as undefined | string,
  )

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
        const result = await post<IAuthSignIn>('/auth/sign-in', {
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
    [ login, password, post, rememberMe, signIn ],
  )

  return (
    <form noValidate onSubmit={ handlerSubmit }>
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
    </form>
  )
}
