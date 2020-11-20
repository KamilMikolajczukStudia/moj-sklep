import React, { Fragment, ReactNode, useEffect } from 'react'

const currencyOptions = {
  style: 'currency',
  currency: 'PLN'
}
const nonCurrencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

export function ToMoneyString(amount: number, currency = true) {
  return amount.toLocaleString('pl-PL', currency ? currencyOptions : nonCurrencyOptions)
}

export function useInit(effect: () => (void | Promise<void> | (() => (void | undefined)))) {
  return useEffect(() => {
    const res = effect()

    if (res instanceof Promise) res.then()
    else return res

    // eslint-disable-next-line
  }, [])
}

interface IForProps<T> {
  of: T[]
  children: (item: T) => ReactNode
}

/**
 * @example
 * <For of={ [ 1, 2, 3 ] }>{
 *   a => <li>{ a }</li>
 * }</For>
 */
export function For<T>({ of, children }: IForProps<T>) {
  return <>{ of.map((el, i) => <Fragment key={ i }>{ children(el) }</Fragment>) }</>
}
