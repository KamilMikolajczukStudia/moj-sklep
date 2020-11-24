import { Request } from 'express'

import { User } from '../Imports'

export interface DataStoredInToken {
  id: number
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface RequestWithUser<T = never> extends Request {
  body: T
  user: User
  cookies: { [key: string]: string }
}
