import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme }                                  from '@material-ui/core/styles'

import Button    from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { HttpContext } from '../Http'
import { IAuthSignUp } from '../Imports'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submit: {
      marginTop: theme.spacing(2)
    },
  }),
)

interface ISignUpProps {
  onSuccess(): void
}

export function SignUp({ onSuccess }: ISignUpProps) {
  const { post } = useContext(HttpContext)

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
        await post<IAuthSignUp>('/auth/sign-up', {
          login,
          password,
        })

        onSuccess()
      } catch (e) {
        setErrorMessage(e.message)
      }
    },
    [ login, onSuccess, password, post ],
  )

  return (
    <form noValidate onSubmit={ handlerSubmit }>
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
        className={ classes.submit }
        disabled={ login.length === 0 || password.length === 0 }
      >
        Zarejestruj się
      </Button>
    </form>
  )
}