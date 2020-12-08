import { IUserDao } from "../daos"
import { IUserDto } from "../dtos"

export class User {
  id: number
  login: string
  password: string

  constructor(user: IUserDao) {
    this.id = user.userId
    this.login = user.login
    this.password = user.password
  }

  public dto() {
    const { password, ...rest } = this

    return rest as IUserDto
  }
}
