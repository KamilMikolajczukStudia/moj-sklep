import { NextFunction, Request, Response } from 'express'
import { SignInUserDto, SignUpUserDto } from '../dtos/users.dto'
import { RequestWithUser } from '../interfaces/auth.interface'
import { User } from '../interfaces/User'
import AuthService from '../services/auth.service'

class AuthController {
  private authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: SignUpUserDto = req.body

    try {
      const signUpUserData = await this.authService.signUp(userData)
      res.status(201).json({ data: signUpUserData.getData(), message: 'signup' })
    } catch (error) {
      next(error)
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: SignInUserDto = req.body

    try {
      const { cookie, findUser } = await this.authService.signIn(userData)
      res.setHeader('Set-Cookie', [cookie])
      res.status(200).json({ data: findUser.getData(), message: 'login' })
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
      const logOutUserData = await this.authService.signOut(userData)
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
      res.status(200).json({ data: logOutUserData.getData(), message: 'logout' })
    } catch (error) {
      next(error)
    }
  }

  public auth = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    res.status(200).json({ data: user.getData(), message: 'auth' })
  }
}

export default AuthController
