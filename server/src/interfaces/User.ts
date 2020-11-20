export interface IUser {
  id: number
  login: string
  money: number
  limit: number
  isAdmin: boolean
  password: string
  cardNumber: string
}

export interface IUserData
  extends Pick<IUser, Exclude<keyof IUser, "password">> {}

export class User implements IUser {
  id: number
  login: string
  money: number
  limit: number
  isAdmin: boolean
  password: string
  cardNumber: string

  constructor(user: IUser) {
    this.id = user.id
    this.login = user.login
    this.isAdmin = user.isAdmin
    this.password = user.password
    this.cardNumber = user.cardNumber
    this.money = this.round(user.money)
    this.limit = this.round(user.limit)
  }

  round(x: number) {
    return Math.round(x * 100) / 100
  }

  getData() {
    const { password, ...rest } = this

    return rest as IUserData
  }
}
