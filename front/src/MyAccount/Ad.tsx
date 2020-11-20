import React from 'react'

import Paper from '@material-ui/core/Paper'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography }               from '@material-ui/core'

const useStyles = makeStyles(
  createStyles({
    image: {
      maxHeight: 300,
      display: 'block',
    },
    root: {
      width: 'fit-content',
      margin: 'auto',
    },
    container: {
      width: 'fit-content',
    }
  }),
)

interface IAdProps {
  img: string
}

export default function Ad({ img }: IAdProps) {
  const classes = useStyles()

  return (
    <div className={ classes.root }>
      <Paper classes={ { root: classes.container } } elevation={ 5 }>
        <img src={ img } alt="" className={ classes.image } />
      </Paper>

      <Typography variant="caption">To nie jest reklama</Typography>
    </div>
  )
}
