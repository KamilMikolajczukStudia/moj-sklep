import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'

import Button                              from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography                          from '@material-ui/core/Typography'
import TextField                           from '@material-ui/core/TextField'
import Autocomplete                        from '@material-ui/lab/Autocomplete'

import { HttpContext }                 from '../Http'
import { For, ToMoneyString, useInit } from '../utils'
import { UserContext }                 from "../User";
import Ad                              from "../MyAccount/Ad";

import onion from "../img/cebula.jpeg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: '16px 0'
    },
    button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    consts: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(3)
    }
  }),
)

function getCurrentMonthName() {
  const date = new Date()

  return date.toLocaleString('pl-PL', { month: 'long' })
}

const defaultAmount = 10

interface IUserName {
  id: number
  login: string
}

interface IUserNameSearch extends IUserName {
  loginLower: string
}

interface IUsersResult {
  data: IUserName[]
  message: string
}

const availableFastAmounts = [ 10, 230, 999.99, 2000, 4500, 9474.37, 15000, 20000 ]
const availableFastTitles = [ `Wypłata za ${ getCurrentMonthName() }`, 'Zwrot za zakupy', 'Faktura PL-2020-11-21-4525', 'A kup sobie te buty' ]

export default function Transfer() {
  const classes = useStyles()
  const { reload, user: { limit, money } } = useContext(UserContext)
  const { get, post } = useContext(HttpContext)

  const maxAmount = Math.max(limit + money, 0)

  const [ otherUsers, setOtherUsers ] = useState([] as IUserNameSearch[])
  const [ amount, setAmount ] = useState(ToMoneyString(Math.min(maxAmount, defaultAmount), false))
  const [ userTo, setUserTo ] = useState(null as null | IUserNameSearch)
  const [ amountValue, setAmountValue ] = useState(Math.min(maxAmount, defaultAmount))
  const [ amountError, setAmountError ] = useState(undefined as undefined | string)
  const [ title, setTitle ] = useState(availableFastTitles[0])
  const [ loading, setLoading ] = useState(true)

  useInit(async () => {
    const others = await get<IUsersResult>('/users')

    setLoading(false)

    if (others !== null) setOtherUsers(others.data.map(u => ({ ...u, loginLower: u.login.toLowerCase() })))
  })

  const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 15) return

    setAmountError(undefined)
    setAmount(event.target.value)
  }, [])

  const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

  const handleCheckAmount = useCallback(() => {
    const value = Number(amount.replaceAll(/,/g, '.').replaceAll(/\s/g, ''))

    if (Number.isNaN(value)) {
      setAmountError('Podaj poprawną wartość')
      return
    }

    if (value <= 0) {
      setAmountError('Podaj dodatnią wartość')
      return
    }

    if (value > maxAmount) {
      setAmountError('Masz za mało pieniędzy na koncie')
      return
    }

    setAmountError(undefined)
    setAmountValue(Math.round(value * 100) / 100)

  }, [ amount, maxAmount ])

  const handleSend = useCallback(() => {
    setLoading(true)

    async function SendMoney() {
      if (userTo === null) return

      await post('/createOperation', { title, amount: amountValue, userTo: userTo.id })

      setUserTo(null)
      setLoading(false)
      setTitle(availableFastTitles[0])
      setAmountValue(Math.min(maxAmount, defaultAmount))
      setAmount(ToMoneyString(Math.min(maxAmount, defaultAmount), false))

      reload()
    }

    SendMoney().then()
  }, [ title, amountValue, post, userTo ])

  const handleChangeUserTo = useCallback((event: any, newValue: IUserNameSearch | null) => {
    setUserTo(newValue)
  }, [])

  useEffect(handleCheckAmount, [amountValue])

  return (
    <>
      <Typography gutterBottom variant="h4">
        Super przelew
      </Typography>

      <div>
        <TextField
          value={ amount }
          variant="outlined"
          label="Kwota w ZŁ"
          error={ !!amountError }
          onBlur={ handleCheckAmount }
          onChange={ handleAmountChange }
          classes={ { root: classes.input } }
          helperText={ amountError }
        />

        <For of={ availableFastAmounts }>
          {
            (many) =>
              <Button
                color="secondary"
                variant="outlined"
                classes={ { root: classes.consts } }
                onClick={ () => {
                  setAmountValue(many)
                  setAmount(ToMoneyString(many, false))
                } }
              >
                { ToMoneyString(many) }
              </Button>
          }
        </For>
      </div>

      <div>
        <TextField
          label="Tytułem"
          value={ title }
          variant="outlined"
          style={ { width: 600 } }
          onChange={ handleTitleChange }
          classes={ { root: classes.input } }
        />

        <For of={ availableFastTitles }>
          {
            (title) =>
              <Button
                color="secondary"
                variant="outlined"
                classes={ { root: classes.consts } }
                onClick={ () => {
                  setTitle(title)
                } }
              >
                { title }
              </Button>
          }
        </For>
      </div>

      <Autocomplete
        value={ userTo }
        loading={ loading }
        options={ otherUsers }
        style={ { width: 400 } }
        onChange={ handleChangeUserTo }
        loadingText={ 'Ładowanie ...' }
        noOptionsText={ 'Brak użytkowników' }
        getOptionLabel={ (option) => option.login }
        renderInput={ (params) => <TextField { ...params } label="Odbiorca" variant="outlined" /> }
        filterOptions={ (options, { inputValue }) => options.filter(o => o.loginLower.startsWith(inputValue.toLowerCase())) }
      />

      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={ handleSend }
        disabled={ !!amountError || !userTo }
        classes={ { root: classes.button } }
      >
        Wyślij
      </Button>

      { loading && <Typography>Dodawanie</Typography> }

      <Ad img={ onion } />
    </>
  )
}
