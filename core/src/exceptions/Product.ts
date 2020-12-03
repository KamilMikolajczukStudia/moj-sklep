import { Exception } from "./Exception"

export class ProductExeception extends Exception {
  constructor(message: string) {
    super(message)
  }
}

export class ProductNotFoundExeception extends ProductExeception {
  constructor(public id: number) {
    super(`Product with id ${id} not found`)
  }
}
