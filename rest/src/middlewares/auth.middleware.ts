import { NextFunction, Response } from 'express'

import { AuthService } from '../Imports'
import HttpException from '../exceptions/HttpException'
import { RequestWithUser } from '../interfaces/auth.interface'

export async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authService = new AuthService()
  const cookies = req.cookies

  if (cookies && cookies.Authorization) {
    const user = await authService.verify(cookies.Authorization)

    if (user) {
      req.user = user
      next()
      return
    }
  }

  next(new HttpException(401, 'Użytkownik niezalogowany'))
}
