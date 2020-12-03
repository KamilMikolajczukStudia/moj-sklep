export interface IUserDto {
  id: number
  login: string
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
