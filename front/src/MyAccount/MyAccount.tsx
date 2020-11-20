import React from 'react'

import Typography from '@material-ui/core/Typography'

import Banner     from './Banner'
import Operations from './Operations'
import Limit      from './Limit'
import Ad         from './Ad'

import credit from '../img/kredyt.png'

export default function MyAccount() {
  return (
    <>
      <Banner />

      <Typography gutterBottom variant="h5">
        Operacje na koncie
      </Typography>

      <Operations />

      <Limit />

      <Ad img={ credit } />
    </>
  )
}
