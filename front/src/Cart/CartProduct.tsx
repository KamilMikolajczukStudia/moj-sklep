import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme }                                  from '@material-ui/core/styles'
import { If, Money }                                                        from '../utils'

import ListItem       from '@material-ui/core/ListItem'
import ListItemText   from '@material-ui/core/ListItemText'
import TextField      from '@material-ui/core/TextField'
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton     from "@material-ui/core/IconButton"

import DeleteIcon from "@material-ui/icons/Delete"

import { CartContext } from "./CartContext"
import { CartData }    from "./CartData"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    discount: {
      margin: theme.spacing(0, 1),
      color: theme.palette.secondary.main,
      fontSize: '0.8em'
    },
    counter: {
      width: 100,
      marginLeft: theme.spacing(2),
    },
    counterInput: {
      textAlign: 'center',
    },
    delete: {
      marginLeft: theme.spacing(1)
    }
  }),
)

interface ICartProductProps {
  data: CartData
}

export function CartProduct({
                              data: {
                                variant,
                                product: {
                                  id, name, price, discount, unit
                                }
                              },
                            }: ICartProductProps) {
  const classes = useStyles()

  const { quantityOf, addToCart, removeFromCart } = useContext(CartContext)

  const quantity = quantityOf(id, variant)
  const [ tmpQuantity, setTmpQuantity ] = useState(quantity)

  useEffect(() => {
    setTmpQuantity(quantity)
  }, [ quantity ])

  const handleQuantitySave = useCallback(() => {
    if (tmpQuantity > quantity) {
      addToCart(id, variant, tmpQuantity - quantity)
    }

    if (tmpQuantity < quantity) {
      removeFromCart(id, variant, quantity - tmpQuantity)
    }
  }, [ addToCart, id, quantity, removeFromCart, tmpQuantity, variant ])

  const handleQuantityChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const _quantity = parseInt(value)

    if (_quantity <= 0 || _quantity > variant.quantity) return

    setTmpQuantity(_quantity)
  }, [variant.quantity])

  const handleRemoveProduct = useCallback(() => {
    removeFromCart(id, variant)
  }, [ id, removeFromCart, variant ])

  return (
    <ListItem className={ classes.listItem }>
      <ListItemText primary={ name } secondary={ `Rozmiar ${ variant.name }` } />

      <div>
        <If condition={ discount !== null }>
          <s className={ classes.discount }><Money value={ discount as number } /></s>
        </If>

        <b><Money value={ price } /></b>
      </div>

      <div>
        <TextField value={ tmpQuantity }
                   type="number"
                   className={ classes.counter }
                   onChange={ handleQuantityChange }
                   onBlur={ handleQuantitySave }
                   inputProps={ { className: classes.counterInput } }
                   InputProps={ { endAdornment: <InputAdornment position="end">{ unit }</InputAdornment> } }
        />

        <IconButton onClick={ handleRemoveProduct } color="inherit" title="Usuń" className={ classes.delete }>
          <DeleteIcon />
        </IconButton>
      </div>
    </ListItem>
  )
}
