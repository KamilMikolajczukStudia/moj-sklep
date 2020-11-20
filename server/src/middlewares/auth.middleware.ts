import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import UserService from '../services/users.service'
import HttpException from '../exceptions/HttpException'
import {
  DataStoredInToken,
  RequestWithUser
} from '../interfaces/auth.interface'

export default async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const userService = new UserService()
  const cookies = req.cookies

  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET

    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken
      const userId = verificationResponse.id
      const findUser = await userService.selectOne((user) => user.id === userId)

      if (findUser) {
        req.user = findUser
        next()
        return
      }
    } catch {}
  }

  next(new HttpException(401, 'Użytkownik niezalogowany'))
}
