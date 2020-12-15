import { IUserDto } from "../dtos"

export enum ERoles { normal, biznes, manager, admin }

export class User {
  readonly id: number
  readonly login: string
  readonly password: string
  readonly role: ERoles

  constructor(id: number, login: string, password: string, role: ERoles) {
    this.id = id
    this.login = login
    this.password = password
    this.role = role
  }

  public dto(): IUserDto {
    const { password, ...rest } = this

    return rest
  }
}
