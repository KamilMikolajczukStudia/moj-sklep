import React, { ChangeEvent, useCallback, useContext, useState } from 'react'

import Grid                from '@material-ui/core/Grid'
import TextField           from '@material-ui/core/TextField'
import FormControlLabel    from '@material-ui/core/FormControlLabel'
import Checkbox            from '@material-ui/core/Checkbox'
import { CheckoutContext } from "./CheckoutContext";
import { useDestruct }     from "../../utils";

const cvvRegExp = /^\d{0,3}$/

export function PaymentForm() {
  const { useUserCvv, useUserCard, userCvv, userCard } = useContext(CheckoutContext)

  const [ cartNumber, setCartNumber ] = useState(userCard)

  const handleCartNumberChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCartNumber(value)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUserCard(value)
  }, [ useUserCard ])

  const [ cvvNumber, setCvvNumber ] = useState(userCvv)

  const handleCvvNumberChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (cvvRegExp.test(value)) {
      setCvvNumber(value)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useUserCvv(value)
    }
  }, [ useUserCvv ])


  useDestruct(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUserCvv(cvvNumber)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUserCard(cartNumber)
  })


  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 } md={ 12 }>
        <TextField
          required
          fullWidth
          value={ cartNumber }
          label="Numer karty"
          autoComplete="cc-number"
          onChange={ handleCartNumberChange }
        />
      </Grid>


      <Grid item xs={ 12 } md={ 2 }>
        <TextField
          required
          fullWidth
          label="Kod CVV"
          value={ cvvNumber }
          autoComplete="cc-csc"
          onChange={ handleCvvNumberChange }
        />
      </Grid>

      <Grid item xs={ 12 }>
        <FormControlLabel
          control={ <Checkbox color="secondary" value={ false }/> }
          label="Zapamiętaj kartę na następne zakupy"
        />
      </Grid>
    </Grid>
  )
}