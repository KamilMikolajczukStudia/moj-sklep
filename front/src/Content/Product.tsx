import React, { useCallback, useContext, useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card                                from '@material-ui/core/Card'
import Badge                               from '@material-ui/core/Badge'
import Select                              from '@material-ui/core/Select'
import MenuItem                            from '@material-ui/core/MenuItem'
import CardMedia                           from '@material-ui/core/CardMedia'
import Typography                          from '@material-ui/core/Typography'
import IconButton                          from '@material-ui/core/IconButton'
import CardContent                         from '@material-ui/core/CardContent'
import CardActions                         from '@material-ui/core/CardActions'
import CardActionArea                      from '@material-ui/core/CardActionArea'

import AddIcon                from '@material-ui/icons/Add'
import RemoveIcon             from '@material-ui/icons/Remove'
import AddShoppingCartIcon    from '@material-ui/icons/AddShoppingCart'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import { For, forOf, If, Money } from '../utils'
import { ProductData, Variant }  from '../Products'
import { CartContext }           from '../Cart'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.spacing(54),
      minWidth: theme.spacing(30),
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column'
    },
    media: {
      height: theme.spacing(50),
    },
    actions: {
      marginTop: 'auto',
      display: 'block',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2),
    },
    price: {
      marginLeft: theme.spacing(1)
    },
    discount: {
      color: theme.palette.secondary.main,
      fontSize: '0.8em'
    },
    discountTitle: {
      textShadow: '0 0 16px white',
      fontWeight: 'bold',
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1.5)
    },
    addRemoveToCard: {
      marginRight: theme.spacing(1)
    },
    selectVariant: {
      width: theme.spacing(10),
      marginLeft: theme.spacing(1),

    },

    selectVariantInner: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    },
    variantTitle: {
      display: 'inline-block',
      marginLeft: theme.spacing(1)
    }
  }),
)

interface IProductProps {
  data: ProductData
}

export function Product({ data: { id, name, description, price, discount, img, variants } }: IProductProps) {
  const classes = useStyles()

  const { addToCart, removeFromCart, quantityOf } = useContext(CartContext)

  const [ selectedVariant, setSelectedVariant ] = useState(variants[Math.floor(variants.length / 2)])

  const quantity = quantityOf(id, selectedVariant)
  const bought = quantity > 0

  const handleAddToCart = useCallback(() => {
    addToCart(id, selectedVariant, 1)
  }, [ id, addToCart, selectedVariant ])

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(id, selectedVariant, 1)
  }, [ id, removeFromCart, selectedVariant ])

  const handleRemoveAllFromCart = useCallback(() => {
    removeFromCart(id, selectedVariant)
  }, [ id, removeFromCart, selectedVariant ])

  const handleChangeVariant = useCallback((event: any) => {
    if (event.target?.value) {
      const name = event.target?.value

      setSelectedVariant(variants.find(v => v.name === name) as Variant)
    }
  }, [ variants ])

  return (
    <Card className={ classes.root }>
      <CardActionArea>
        <CardMedia
          className={ classes.media }
          image={ `/img/${ img }` }
          title={ name }
        >
          <If condition={ discount !== null }>
            <Typography component="div" variant="h5" className={ classes.discountTitle }>Promocja!</Typography>
          </If>
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{ name }</Typography>

          <For of={ description }>
            { (line) =>
              <Typography gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
              >{ line }</Typography>
            }
          </For>

          <br/>

          <Typography>
            Na magazynie: { selectedVariant.quantity } sztuk
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={ classes.actions }>
        <If condition={ variants.length > 0 } component="div">
          <Typography gutterBottom className={ classes.variantTitle }>Wariant</Typography>

          <Select
            value={ selectedVariant.name }
            onChange={ handleChangeVariant }
            className={ classes.selectVariant }
            inputProps={ { className: classes.selectVariantInner } }
          >
            {
              forOf(variants)((variant) => <MenuItem key={ variant.name }
                                                     value={ variant.name }>{ variant.name }</MenuItem>)
            }
          </Select>
        </If>

        <div className={ classes.cardActions }>
          <Typography className={ classes.price }>
            <If condition={ discount !== null }>
              <s className={ classes.discount }><Money value={ discount as number }/></s>
              <br/>
            </If>

            <b><Money value={ price }/></b>
          </Typography>

          <If condition={ bought } component="div">
            <IconButton
              size="small"
              color="default"
              title="Odejmij 1 sztukę"
              disabled={ quantity <= 1 }
              onClick={ handleRemoveFromCart }
              className={ classes.addRemoveToCard }
            >
              <RemoveIcon/>
            </IconButton>

            <IconButton
              size="small"
              color="primary"
              title="Dodaj 1 sztukę"
              onClick={ handleAddToCart }
              disabled={ quantity >= selectedVariant.quantity }
              className={ classes.addRemoveToCard }
            >
              <AddIcon/>
            </IconButton>

            <Badge max={ 99 } badgeContent={ quantity } color="primary"
                   anchorOrigin={ { vertical: 'top', horizontal: 'left' } }>
              <IconButton
                color="default"
                title="Usuń wszystko z koszyka"
                onClick={ handleRemoveAllFromCart }
              >
                <RemoveShoppingCartIcon/>
              </IconButton>
            </Badge>
          </If>

          <If condition={ !bought }>
            <IconButton
              color="secondary"
              title="Dodaj do koszyka"
              onClick={ handleAddToCart }
              disabled={ quantity >= selectedVariant.quantity }
            >
              <AddShoppingCartIcon/>
            </IconButton>
          </If>
        </div>
      </CardActions>
    </Card>
  )
}
