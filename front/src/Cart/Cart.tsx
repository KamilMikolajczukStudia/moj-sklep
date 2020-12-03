import React, { useCallback, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme }          from '@material-ui/core/styles'

import { ListItem }  from '@material-ui/core'
import List          from '@material-ui/core/List'
import Badge         from '@material-ui/core/Badge'
import Dialog        from '@material-ui/core/Dialog'
import Button        from '@material-ui/core/Button'
import IconButton    from '@material-ui/core/IconButton'
import Typography    from '@material-ui/core/Typography'
import DialogTitle   from '@material-ui/core/DialogTitle'
import ListItemText  from '@material-ui/core/ListItemText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { CartContext }             from './index'
import { For, If, Money }          from '../utils'
import { UserContext }             from '../User'
import { Checkout }                from './Checkout'
import { CartProduct }             from './CartProduct'
import CloseIcon                   from "@material-ui/icons/Close";
import { CheckoutContextProvider } from "./Checkout/CheckoutContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
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

export function Cart() {
  const classes = useStyles()

  const { isLogin } = useContext(UserContext)
  const { cartQuantity, cart, total } = useContext(CartContext)

  const [ open, setOpen ] = useState(false)
  const [ checkoutOpen, setCheckoutOpen ] = useState(false)

  const handleOpenCart = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseCart = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpenCheckout = useCallback(() => {
    handleCloseCart()
    setCheckoutOpen(true)
  }, [ handleCloseCart ])

  const handleCloseCheckout = useCallback(() => {
    setCheckoutOpen(false)
  }, [])

  return (
    <>
      <Badge max={ 99 } badgeContent={ cartQuantity } color="secondary">
        <IconButton onClick={ handleOpenCart } color="inherit" title="Koszyk">
          <ShoppingCartIcon/>
        </IconButton>
      </Badge>

      <Dialog
        fullWidth
        open={ open }
        maxWidth="md"
        scroll="paper"
        onClose={ handleCloseCart }
      >
        <DialogTitle className={ classes.dialogTitle }>
          <Typography variant="h6">Kasa</Typography>

          <IconButton className={ classes.closeButton } onClick={ handleCloseCart }>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContent>
            <If condition={ cart.length === 0 }>
              <Typography variant="h6" gutterBottom>
                Twój koszyk jest pusty
              </Typography>
            </If>

            <For of={ cart } component={ List } disableWrapper>
              { (c) => <CartProduct key={ `${ c.product.id }-${ c.variant }` } data={ c }/> }
            </For>

            <If condition={ cart.length > 0 }>
              <ListItem className={ classes.listItem }>
                <ListItemText primary="Razem"/>

                <Typography variant="subtitle1" className={ classes.total }>
                  <Money value={ total }/>
                </Typography>
              </ListItem>
            </If>
          </DialogContent>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleOpenCheckout } variant="contained" color="primary"
                  disabled={ !isLogin || cartQuantity === 0 }>
            Do kasy
          </Button>
        </DialogActions>
      </Dialog>

      <CheckoutContextProvider>
        <Checkout open={ checkoutOpen } onClose={ handleCloseCheckout }/>
      </CheckoutContextProvider>
    </>
  )
}
