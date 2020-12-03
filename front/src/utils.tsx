import React, { ElementType, Fragment, ReactNode, useEffect } from 'react'

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

interface IMoneyProps {
  value: number
  currency?: boolean
}

export function Money({ value, currency }: IMoneyProps) {
  return <>{ ToMoneyString(value, currency) }</>
}

export function useInit(effect: () => (void | Promise<void> | (() => (void | undefined)))) {
  useEffect(() => {
    const res = effect()

    if (res instanceof Promise) {
      res.then()
    }
    else {
      return res
    }

    // eslint-disable-next-line
  }, [])
}

export function useDestruct(effect: () => (void | Promise<void> | (() => (void | undefined)))) {
  let _effect = effect

  useEffect(() => () => {
    const res = _effect()

    if (res instanceof Promise) {
      res.then()
    }

    // eslint-disable-next-line
  }, [])
}

interface IForProps<T, C> {
  of: T[]
  component?: C
  componentProps?: object
  disableWrapper?: boolean
  children: (item: T, i: number) => ReactNode
}

/**
 * @example
 * <For of={ [ 1, 2, 3 ] }>{
 *   a => <li>{ a }</li>
 * }</For>
 */
export function For<T, C extends ElementType>({ of, children, disableWrapper, component, componentProps = {} }: IForProps<T, C>) {
  const Component = component || Fragment

  if (disableWrapper) return <Component { ...componentProps }>{ of.map((el, i) => children(el, i)) }</Component>

  return <Component { ...componentProps }>{ of.map((el, i) => <Fragment
    key={ i }>{ children(el, i) }</Fragment>) }</Component>
}

interface IIfProps<C> {
  condition: boolean
  component?: C
  componentProps?: object
  children: ReactNode
}

export function If<C extends ElementType>({ condition, children, component, componentProps = {} }: IIfProps<C>) {
  const Component = component || Fragment

  return <Component { ...componentProps }>{ condition && children }</Component>
}

export function forOf<T>(array: T[]) {
  return (generator: (item: T, i: number) => ReactNode) => array.map(generator)
}