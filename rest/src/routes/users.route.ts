import { Router } from 'express'

import { Route } from './routes.interface'
import { LimitDto } from '../dtos/Users.dto'
import { UsersController } from '../controllers'
import { authMiddleware, validationMiddleware } from '../middlewares'

class UsersRoute implements Route {
  public path = '/users'
  public router = Router()

  private usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.usersController.getUsersNames
    )

    this.router.post(
      `${this.path}/limit`,
      authMiddleware,
      validationMiddleware(LimitDto),
      this.usersController.updateLimit
    )
  }
}

export default UsersRoute
