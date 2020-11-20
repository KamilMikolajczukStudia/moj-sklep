import React, { ChangeEvent, useCallback, useContext, useState } from 'react'

import TextField                           from '@material-ui/core/TextField'
import Button                              from '@material-ui/core/Button'
import Typography                          from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { For, ToMoneyString } from '../utils'
import { UserContext }        from '../User'
import { HttpContext }        from "../Http";

const availableFastLimits = [ 0, 100, 500, 1000, 10000, 50000 ]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    consts: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(2),
    },
    edit: {
      marginBottom: theme.spacing(3)
    }
  }),
)

export default function Limit() {
  const classes = useStyles()
  const { user: { limit: startLimit }, reload } = useContext(UserContext)
  const { post } = useContext(HttpContext)

  const [ edit, setEdit ] = useState(false)
  const [ limit, setLimit ] = useState(ToMoneyString(startLimit, false))
  const [ limitValue, setLimitValue ] = useState(startLimit)
  const [ amountCorrect, setAmountCorrect ] = useState(true)
  const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 15) return

    setAmountCorrect(true)
    setLimit(event.target.value)
  }, [])

  const handleEdit = useCallback(() => setEdit(v => !v), [])

  const handleCheckAmount = useCallback(() => {
    const value = Number(limit.replaceAll(/,/g, '.').replaceAll(/\s/g, ''))

    if (Number.isNaN(value) || value < 0) {
      setAmountCorrect(false)
      return
    }

    setAmountCorrect(true)
    setLimitValue(Math.round(value * 100) / 100)

  }, [ limit ])

  const handleSave = useCallback(() => {
    async function SendMoney() {

      try {
        await post('/users/limit', { limit: limitValue })

        reload()
      } catch (e) {
        alert(e.message)
      }
    }

    SendMoney().then()
  }, [ reload, post, limitValue ])

  return (
    <>
      <Typography gutterBottom variant="h5">
        Limit debetu: { ToMoneyString(startLimit) }
      </Typography>

      <Button variant="outlined" classes={ { root: classes.edit } } onClick={ handleEdit }>
        Edytuj
      </Button>

      {
        edit &&
        <div>
          <TextField
            value={ limit }
            variant="outlined"
            label="Limit w ZŁ"
            error={ !amountCorrect }
            onBlur={ handleCheckAmount }
            onChange={ handleAmountChange }
            helperText={ amountCorrect ? undefined : "Podaj poprawną nie zerową liczbę" }
          />

          <For of={ availableFastLimits }>
            {
              (many) =>
                <Button
                  color="secondary"
                  variant="outlined"
                  classes={ { root: classes.consts } }
                  onClick={ () => {
                    setLimitValue(many)
                    setLimit(ToMoneyString(many, false))
                  } }
                >
                  { ToMoneyString(many) }
                </Button>
            }
          </For>

        </div>
      }

      {
        edit &&
        <Button
          color="primary"
          variant="contained"
          onClick={ handleSave }
          disabled={ !amountCorrect || (limitValue === startLimit) }
          classes={ { root: classes.button } }
        >
          Zapisz
        </Button>
      }
    </>
  )
}
