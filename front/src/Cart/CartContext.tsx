import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { ProductsContext, Variant } from '../Products'
import { CartData }                 from './CartData'

interface ICartContextValue {
  total: number
  cartQuantity: number
  cart: CartData[]
  quantityOf: (id: number, variant: Variant) => number
  addToCart: (id: number, variant: Variant, quantity?: number) => void
  removeFromCart: (id: number, variant: Variant, quantity?: number) => void
}

const defaultValue: ICartContextValue = {
  cart: [],
  total: 0,
  cartQuantity: 0,
  quantityOf: () => 0,
  addToCart: () => void 0,
  removeFromCart: () => void 0,
}

export const CartContext = createContext<ICartContextValue>(defaultValue)

interface ICartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: ICartContextProviderProps) {
  const { allProducts } = useContext(ProductsContext)
  const [ cart, setCart ] = useState([] as CartData[])

  const cartQuantity = cart.reduce((sum, p) => p.quantity + sum, 0)
  const total = cart.reduce((sum, c) => c.price + sum, 0)

  const addToCart = useCallback((id: number, variant: Variant, quantity = 1) => {
    if (Math.round(quantity) <= 0) return

    const isNew = !cart.some(c => c.product.id === id && c.variant === variant)

    if (isNew) {
      const product = allProducts.find(p => p.id === id)

      if (!product) return

      setCart([ ...cart, new CartData(product, variant, quantity) ])
    } else {
      setCart(cart.map(c => c.product.id === id && c.variant === variant ? c.add(quantity) : c))
    }
  }, [ cart, allProducts ])

  const removeFromCart = useCallback((id: number, variant: Variant, quantity?: number) => {
    if (quantity !== undefined && Math.round(quantity) <= 0) return

    const position = cart.find(c => c.product.id === id && c.variant === variant)

    if (position) {
      if (quantity === undefined || Math.round(quantity) >= position.quantity) {
        setCart(cart.filter(c => c.product.id !== id))
      } else {
        setCart(cart.map(c => c.product.id === id && c.variant === variant ? c.remove(quantity) : c))
      }
    }
  }, [ cart ])

  const quantityOf = useCallback((id: number, variant: Variant) => {
    const position = cart.find(c => c.product.id === id && c.variant === variant)

    return position ? position.quantity : 0
  }, [ cart ])

  return (
    <CartContext.Provider
      value={ {
        cart,
        total,
        addToCart,
        quantityOf,
        cartQuantity,
        removeFromCart
      } }>
      { children }
    </CartContext.Provider>
  )
}
