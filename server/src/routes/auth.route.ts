import { Router } from 'express'

import Route from '../interfaces/routes.interface'
import AuthController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'
import { SignUpUserDto, SignInUserDto } from '../dtos/users.dto'
import validationMiddleware from '../middlewares/validation.middleware'

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

    this.router.post(
      `/auth`,
      authMiddleware,
      this.authController.auth
    )

    this.router.post(`/signout`, authMiddleware, this.authController.signOut)
  }
}

export default AuthRoute
