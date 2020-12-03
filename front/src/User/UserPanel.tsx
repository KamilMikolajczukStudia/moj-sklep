import React, { useCallback, useContext }       from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'

import Badge         from '@material-ui/core/Badge'
import Avatar        from '@material-ui/core/Avatar'
import Button        from '@material-ui/core/Button'
import Typography    from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'

import avatarImg from '../img/avatar.jpg'

import { UserContext }  from './UserContext'
import { HttpContext }  from '../Http'
import { IAuthSignOut } from '../Imports'

const StyledBadge = withStyles((theme) =>
  createStyles({
    badge: {
      width: 12,
      height: 12,
      borderRadius: 12 / 2,
      color: '#44b700',
      backgroundColor: '#44b700',
      boxShadow: `0 0 0 2px ${ theme.palette.background.paper }`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(4, 'auto'),
    },
    avatarImg: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      boxShadow: theme.shadows[5],
    },
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    login: {
      textTransform: 'capitalize'
    }
  }),
)

export function UserPanel() {
  const classes = useStyles()

  const { user } = useContext(UserContext)
  const { post } = useContext(HttpContext)

  const handleSignOut = useCallback(async () => {
    await post<IAuthSignOut>('/auth/sign-out')
  }, [ post ])

  return (
    <DialogContent dividers className={ classes.root }>
      <div className={ classes.avatar }>
        <StyledBadge
          overlap="circle"
          anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'right',
          } }
          variant="dot"
        >
          <Avatar className={ classes.avatarImg } alt="Polak pospolity" src={ avatarImg } />
        </StyledBadge>
      </div>

      <Typography gutterBottom align="center" variant="h3" className={ classes.login }>{ user.login }</Typography>

      <Button onClick={ handleSignOut } size="large" color="primary">Wyloguj</Button>
    </DialogContent>

  )
}
