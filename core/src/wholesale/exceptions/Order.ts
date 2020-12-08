import { Exception } from '../../utils'

export class OrderExeception extends Exception {
  constructor(message: string) {
    super(message)
  }
}

export class OrderNotFoundExeception extends OrderExeception {
  constructor(public id: number) {
    super(`Order with id ${id} not found`)
  }
}
