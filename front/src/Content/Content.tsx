import React, { useContext }               from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Grid             from '@material-ui/core/Grid'
import Paper            from '@material-ui/core/Paper'
import AppBar           from '@material-ui/core/AppBar'
import Toolbar          from '@material-ui/core/Toolbar'
import Typography       from '@material-ui/core/Typography'
import Container        from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import Logo                from '../Logo'
import { UserMenu }        from '../User'
import { Cart }            from '../Cart'
import { For, If }         from '../utils'
import { Product }         from './Product'
import { Options }         from './Options'
import { ProductsContext } from '../Products'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 24,
      marginTop: 12,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2)
    },
    loading: {
      margin: 'auto',
      gridColumn: 2
    },
    products: {
      padding: theme.spacing(1),
      display: 'grid',

      gridTemplateColumns: 'repeat(3, 1fr)',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    }
  }),
)

export function Content() {
  const classes = useStyles()

  const { products, loaded } = useContext(ProductsContext)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo className={ classes.logo }/>

          <Typography variant="h6" className={ classes.title }>Mój sklep</Typography>

          <Cart/>

          <UserMenu/>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid container spacing={ 2 } className={ classes.container }>
          <Grid item md={ 3 } sm={ 4 } xs={ 12 }>
            <Options/>
          </Grid>

          <Grid item md={ 9 } sm={ 8 } xs={ 12 }>
            <Paper className={ classes.products }>
              <If condition={ !loaded }>
                <CircularProgress className={ classes.loading }/>
              </If>

              <If condition={ loaded && products.length === 0 }>
                <Typography className={ classes.loading }>Brak produktów</Typography>
              </If>

              <For of={ products } disableWrapper>
                { (product) => <Product key={ product.id } data={ product }/> }
              </For>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
