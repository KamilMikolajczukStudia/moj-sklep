import { NextFunction, Request, Response } from 'express'

import { AuthService } from '../Imports'

import { RequestWithUser } from '../interfaces/auth.interface'
import { SignInUserDto, SignUpUserDto } from '../dtos/Users.dto'

export class AuthController {
  private authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: SignUpUserDto = req.body

    try {
      const signUpUserData = await this.authService.signUp(userData)
      res.status(201).json({ data: signUpUserData.dto(), message: 'signUp' })
    } catch (error) {
      next(error)
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: SignInUserDto = req.body

    try {
      const { cookie, user } = await this.authService.signIn(userData)

      res.setHeader('Set-Cookie', [cookie])
      res.status(200).json({ data: user.dto(), message: 'signIn' })
    } catch (error) {
      next(error)
    }
  }

  public signOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.user

    try {
      await this.authService.signOut(userData)

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
      res.status(200).json({ data: null, message: 'logout' })
    } catch (error) {
      next(error)
    }
  }

  public auth = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    res.status(200).json({ data: user.dto(), message: 'auth' })
  }
}
