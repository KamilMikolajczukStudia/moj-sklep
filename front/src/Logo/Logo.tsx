import React      from 'react'
import classnames from 'classnames'

import logo           from '../img/logo.svg'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginBottom: 16,
    width: 128,
  },
})

interface ILogoProps {
  className?: string
}

export default function Logo({ className }: ILogoProps) {
  const classes = useStyles()

  return <img src={ logo } alt="" className={ classnames(classes.root, className) } />
}
