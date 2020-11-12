import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import { CreateUserDto } from '../dtos/users.dto'
import Route from '../interfaces/routes.interface'
import authMiddleware from '../middlewares/auth.middleware'
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
      validationMiddleware(CreateUserDto),
      this.authController.signUp
    )
    
    this.router.post(
      `/signin`,
      validationMiddleware(CreateUserDto),
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
