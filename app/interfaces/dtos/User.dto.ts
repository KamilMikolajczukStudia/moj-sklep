export interface IUserDto {
  id: number
  login: string
  money: number
  limit: number
  isAdmin: boolean
  cardNumber: string
}

export interface INewUserDto {
  login: string
  password: string
}

export interface ILoginUserDto {
  login: string
  password: string
  rememberMe: boolean
}
