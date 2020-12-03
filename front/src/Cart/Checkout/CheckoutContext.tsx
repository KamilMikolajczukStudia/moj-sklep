import React, { createContext, ReactNode, useState } from 'react'

interface ICheckoutContextValue {
  isCorrect: boolean
  userName: string
  userSurname: string
  userAddress: string
  userCity: string
  userCard: string
  userCvv: string

  useUserName(name: string): void

  useUserSurname(surname: string): void

  useUserAddress(address: string): void

  useUserCity(city: string): void

  useUserCard(card: string): void

  useUserCvv(cvv: string): void
}

const defaultValue: ICheckoutContextValue = {
  isCorrect: false,
  userName: '',
  userSurname: '',
  userAddress: '',
  userCity: '',
  userCard: '',
  userCvv: '',
  useUserName: () => void 0,
  useUserSurname: () => void 0,
  useUserAddress: () => void 0,
  useUserCity: () => void 0,
  useUserCard: () => void 0,
  useUserCvv: () => void 0,
}

export const CheckoutContext = createContext<ICheckoutContextValue>(defaultValue)

interface ICheckoutContextProviderProps {
  children: ReactNode
}

export function CheckoutContextProvider({ children }: ICheckoutContextProviderProps) {
  const [ userName, _useUserName ] = useState('')
  const [ userSurname, _useUserSurname ] = useState('')
  const [ userAddress, _useUserAddress ] = useState('')
  const [ userCity, _useUserCity ] = useState('')
  const [ userCard, _useUserCard ] = useState('')
  const [ userCvv, _useUserCvv ] = useState('')

  const isCorrect = [
    userName.length > 0,
    userSurname.length > 0,
    userAddress.length > 0,
    userCity.length > 0,
    userCard.length > 0,
    userCvv.length === 3
  ].every(v => v)

  return (
    <CheckoutContext.Provider
      value={ {
        isCorrect, userAddress, userCard, userCity, userCvv, userName, userSurname,
        useUserName: x => _useUserName(x),
        useUserSurname: x => _useUserSurname(x),
        useUserAddress: x => _useUserAddress(x),
        useUserCity: x => _useUserCity(x),
        useUserCard: x => _useUserCard(x),
        useUserCvv: x => _useUserCvv(x)
      } }>
      { children }
    </CheckoutContext.Provider>
  )
}
