import { Router } from 'express'

import Route from '../interfaces/routes.interface'
import UsersController from '../controllers/users.controller'
import authMiddleware from '../middlewares/auth.middleware'
import { LimitDto } from '../dtos/users.dto'
import validationMiddleware from '../middlewares/validation.middleware'

class UsersRoute implements Route {
  public path = '/users'
  public router = Router()
  public usersController = new UsersController()

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
