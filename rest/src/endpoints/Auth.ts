import { IProductDto, IUserDto } from "../Imports"

export interface IAuthSignUp {
  message: "sign-up"
  data: {}
}

export interface IAuthSignOut {
  message: "sign-out"
  data: {}
}

export interface IAuthSignIn {
  message: "sign-in"
  data: IUserDto
}

export interface IAuthAuth {
  message: "auth"
  data: IUserDto
}

export interface IAuth {
  message: "all-products"
  data: IProductDto[]
}
