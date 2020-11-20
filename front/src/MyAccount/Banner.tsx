import React, { useContext } from 'react'

import Paper                               from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography                          from '@material-ui/core/Typography'

import { UserContext }   from '../User'
import { ToMoneyString } from '../utils'
import tlo               from '../img/dolars.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: theme.spacing(48),
      backgroundImage: `url(${ tlo })`,
      marginBottom: theme.spacing(4),
    },
    info: {
      marginLeft: 'auto',
      marginRight: 20,
      width: theme.spacing(72),
      padding: theme.spacing(4),
    },
    money: {
      fontWeight: 'bold',
    },
    user: {
      textTransform: 'capitalize',
    },
    spacer: {
      height: theme.spacing(3),
    },
  }),
)

export default function Banner() {
  const classes = useStyles()
  const {
    user: { money, login, cardNumber, isAdmin },
  } = useContext(UserContext)

  return (
    <Paper classes={ { root: classes.root } }>
      <Paper classes={ { root: classes.info } }>
        <Typography variant="h3" classes={ { root: classes.user } }>
          { login.toLocaleLowerCase() }
        </Typography>

        <Typography gutterBottom variant="subtitle2" component="div">
          { cardNumber }
        </Typography>

        <Typography variant="caption" component="div" color="secondary">
          { isAdmin ? 'Konto PREMIUM, nie dla januszy' : 'Konto standardowe, idealne dla normika' }
        </Typography>

        <div className={ classes.spacer } />

        <Typography variant="caption" component="div" align="right">
          Dostępne środki
        </Typography>

        <Typography
          variant="h4"
          align="right"
          classes={ { root: classes.money } }
          color={ money < 0 ? 'error' : 'textPrimary' }
        >
          { ToMoneyString(money) }
        </Typography>
      </Paper>
    </Paper>
  )
}
