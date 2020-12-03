import React, { useCallback, useContext, useRef, useState } from 'react'
import { createStyles, makeStyles }                         from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Dialog     from '@material-ui/core/Dialog'

import AccountBoxIcon from '@material-ui/icons/AccountBox'

import { UserContext } from "./UserContext"
import { If }          from "../utils"
import { NoLogin }     from "./NoLogin"
import { UserPanel }   from "./UserPanel"
import Typography      from "@material-ui/core/Typography";
import CloseIcon       from "@material-ui/icons/Close";
import DialogTitle     from "@material-ui/core/DialogTitle";


const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      minHeight: 500
    },
    dialogTitle: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }),
)

export function UserMenu() {
  const classes = useStyles()

  const { isLogin } = useContext(UserContext)

  const [ open, setOpen ] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <IconButton color="inherit" title="Użytkownik" ref={ anchorRef } onClick={ handleToggle }>
        <AccountBoxIcon />
      </IconButton>

      <Dialog fullWidth onClose={ handleClose } open={ open } maxWidth="md" classes={ { paper: classes.dialog } }>
        <DialogTitle disableTypography className={ classes.dialogTitle }>
          <Typography variant="h6">Panel użytkownika</Typography>

          <IconButton className={ classes.closeButton } onClick={ handleClose }>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <If condition={ isLogin }>
          <UserPanel />
        </If>

        <If condition={ !isLogin }>
          <NoLogin />
        </If>
      </Dialog>
    </>
  )
}
