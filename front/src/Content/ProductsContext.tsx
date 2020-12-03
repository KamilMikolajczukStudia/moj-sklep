import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { HttpContext }  from '../Http'
import { useInit }      from '../utils'
import { IProductsAll } from '../Imports'
import { ProductData }  from '../Products'

export enum ESort { None, PriceAsc, PriceDesc, Name }

interface IProductContextValue {
  sorting: ESort
  loaded: boolean
  minPrice: number
  maxPrice: number
  products: ProductData[]
  allProducts: ProductData[]
  applySorting: (type: ESort) => void
  applySearchFilter: (phrase: string) => void
  applyPriceLimit: (limits: [ number, number ]) => void
}

const defaultValue: IProductContextValue = {
  minPrice: 0,
  maxPrice: 1,
  products: [],
  allProducts: [],
  loaded: false,
  sorting: ESort.Name,
  applySorting: () => void 0,
  applyPriceLimit: () => void 0,
  applySearchFilter: () => void 0,
}

export const ProductsContext = createContext<IProductContextValue>(defaultValue)

interface IProductsContextProviderProps {
  children: ReactNode
}

export function ProductsContextProvider({ children }: IProductsContextProviderProps) {
  const { post } = useContext(HttpContext)

  const [ loaded, setLoaded ] = useState(false)
  const [ sorting, setSorting ] = useState(ESort.None)
  const [ minPrice, setMinPrice ] = useState(0)
  const [ maxPrice, setMaxPrice ] = useState(1)

  const [ allProducts, setAllProducts ] = useState([] as ProductData[])
  const [ _minPrice, _setMinPrice ] = useState(minPrice)
  const [ _maxPrice, _setMaxPrice ] = useState(maxPrice)
  const [ _phrase, _setPhrase ] = useState('')

  /**
   * Tmp copy of allProducts with filters and sorted
   */
  const [ products, setProducts ] = useState(allProducts)

  useInit(async () => {
    const products = await post<IProductsAll>('/products')

    if (products) {
      const productsData = products.data.map(p => new ProductData(p))

      setProducts(productsData)
      setAllProducts(productsData)
      setMinPrice(Math.min(...productsData.map(p => p.price)))
      setMaxPrice(Math.max(...productsData.map(p => p.price)))
    }

    setLoaded(true)
  })

  useEffect(() => {
    _setMinPrice(minPrice)
    _setMaxPrice(maxPrice)
  }, [ minPrice, maxPrice ])

  useEffect(() => {
    const phrases = _phrase.toLowerCase().split(' ')

    const sorted = allProducts
    .filter(p =>
      (p.price >= _minPrice && p.price <= _maxPrice) &&
      (phrases.some(t => p.nameLower.includes(t)))
    )

    switch (sorting) {
      case ESort.Name:
        sorted.sort((a, b) => a.nameLower.localeCompare(b.nameLower))
        break

      case ESort.PriceAsc:
        sorted.sort((a, b) => a.price - b.price)
        break

      case ESort.PriceDesc:
        sorted.sort((a, b) => b.price - a.price)
        break

      case ESort.None:
        break
    }

    setProducts(sorted)
  }, [ _maxPrice, _minPrice, _phrase, allProducts, sorting ])

  const applySorting = useCallback((_sorting: ESort) => {
    setSorting(_sorting)
  }, [])

  const applyPriceLimit = useCallback(([ min, max ]: [ number, number ]) => {
    _setMinPrice(min)
    _setMaxPrice(max)
  }, [])

  const applySearchFilter = useCallback((phrase: string) => {
    _setPhrase(phrase)
  }, [])


  return (
    <ProductsContext.Provider
      value={ {
        loaded,
        sorting,
        minPrice,
        products,
        maxPrice,
        allProducts,
        applySorting,
        applyPriceLimit,
        applySearchFilter,
      } }>
      { children }
    </ProductsContext.Provider>
  )
}
