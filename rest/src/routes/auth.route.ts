import { Router } from "express"

import { Route } from "./routes.interface"
import { AuthController } from "../controllers"
import { SignUpUserDto, SignInUserDto } from "../dtos/Users.dto"
import { authMiddleware, validationMiddleware } from "../middlewares"

class AuthRoute implements Route {
  public basePath = "/auth"
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}/sign-up`,
      validationMiddleware(SignUpUserDto),
      this.authController.signUp
    )

    this.router.post(
      `${this.basePath}/sign-in`,
      validationMiddleware(SignInUserDto),
      this.authController.signIn
    )

    this.router.post(
      `${this.basePath}/auth`,
      authMiddleware,
      this.authController.auth
    )

    this.router.post(`${this.basePath}/sign-out`, this.authController.signOut)
  }
}

export default AuthRoute
