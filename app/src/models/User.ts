import { IUserDao } from './daos'
import { IUserDto } from '../../interfaces/dtos'

export class User {
  id: number
  login: string
  money: number
  limit: number
  isAdmin: boolean
  password: string
  cardNumber: string

  constructor(user: IUserDao) {
    this.id = user.userId
    this.login = user.login
    this.isAdmin = user.isAdmin === 1
    this.password = user.password
    this.cardNumber = user.cardNumber
    this.money = this.round(user.money)
    this.limit = this.round(user.limit)
  }

  public canAfford(amount: number) {
    return this.limit + this.money >= amount
  }

  public dto() {
    const { password, ...rest } = this

    return rest as IUserDto
  }

  private round(x: number) {
    return Math.round(x * 100) / 100
  }
}
