import React from 'react'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  }
}))

export default function Content() {
  const classes = useStyles()

  return <>Content</>
}
