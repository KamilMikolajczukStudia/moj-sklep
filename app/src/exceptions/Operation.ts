import { Exception } from "./Exception"

export class OperationExeception extends Exception {
  constructor(message: string) {
    super(message)
  }
}

export class OperationNotFoundExeception extends OperationExeception {
  constructor(public id: number) {
    super(`Operation with id ${id} not found`)
  }
}
