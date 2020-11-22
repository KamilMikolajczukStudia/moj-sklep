import { Exception } from './Exception'

export class AuthExeception extends Exception {
  constructor(public status: number, message: string) {
    super(message)
  }
}
