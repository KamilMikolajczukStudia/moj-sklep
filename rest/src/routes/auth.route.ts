import { Router } from 'express'

import { Route } from './routes.interface'
import { AuthController } from '../controllers'
import { SignUpUserDto, SignInUserDto } from '../dtos/Users.dto'
import { authMiddleware, validationMiddleware } from '../middlewares'

class AuthRoute implements Route {
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `/signup`,
      validationMiddleware(SignUpUserDto),
      this.authController.signUp
    )

    this.router.post(
      `/signin`,
      validationMiddleware(SignInUserDto),
      this.authController.signIn
    )

    this.router.post(`/auth`, authMiddleware, this.authController.auth)

    this.router.post(`/signout`, authMiddleware, this.authController.signOut)
  }
}

export default AuthRoute
