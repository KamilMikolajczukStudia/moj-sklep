import React, { useContext } from 'react'

import Grid                from '@material-ui/core/Grid'
import TextField           from '@material-ui/core/TextField'
import { CheckoutContext } from "./CheckoutContext";
import { useDestruct }     from "../../utils";

export function AddressForm() {
  const { useUserName, useUserAddress, useUserSurname, useUserCvv } = useContext(CheckoutContext)

  useDestruct(() => {

  })

  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          required
          fullWidth
          label="Imie"
        />
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          required
          fullWidth
          label="Nazwisko"
        />
      </Grid>

      <Grid item xs={ 12 }>
        <TextField
          required
          fullWidth
          label="Addres"
        />
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          required
          fullWidth
          label="Miasto"
        />
      </Grid>
    </Grid>
  )
}
