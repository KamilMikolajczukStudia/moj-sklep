import React from 'react'

import { CssBaseline } from '@material-ui/core'

import { UserContextProvider }     from './User'
import { HttpContextProvider }     from './Http'
import { CartContextProvider }     from './Cart'
import { Content }                 from './Content'
import { ProductsContextProvider } from './Products'


export default function App() {
  return (
    <CssBaseline>
      <HttpContextProvider>
        <UserContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <Content />
            </CartContextProvider>
          </ProductsContextProvider>
        </UserContextProvider>
      </HttpContextProvider>
    </CssBaseline>
  )
}
