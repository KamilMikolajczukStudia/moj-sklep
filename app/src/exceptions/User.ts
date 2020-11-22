import { Exception } from "./Exception"

export class UserExeception extends Exception {
  constructor(message: string) {
    super(message)
  }
}

export class UserNotFoundExeception extends UserExeception {
  constructor(public id: number) {
    super(`User with id ${id} not found`)
  }
}
