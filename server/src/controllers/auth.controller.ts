import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '../dtos/users.dto'
import { RequestWithUser } from '../interfaces/auth.interface'
import { User } from '../interfaces/users.interface'
import AuthService from '../services/auth.service'

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body

    try {
      const signUpUserData: User = await this.authService.signup(userData)
      res.status(201).json({ data: signUpUserData, message: 'signup' })
    } catch (error) {
      next(error)
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body

    try {
      const { cookie, findUser } = await this.authService.login(userData)
      res.setHeader('Set-Cookie', [cookie])
      res.status(200).json({ data: findUser, message: 'login' })
    } catch (error) {
      next(error)
    }
  }

  public signOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userData: User = req.user

    try {
      const logOutUserData: User = await this.authService.logout(userData)
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
      res.status(200).json({ data: logOutUserData, message: 'logout' })
    } catch (error) {
      next(error)
    }
  }

  public auth = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user: User = req.user

    res.status(200).json({ data: user, message: 'auth' })
  }
}

export default AuthController
