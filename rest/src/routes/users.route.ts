import { Router } from "express"

import { Route } from "./routes.interface"
import { UsersController } from "../controllers"
import { authMiddleware, validationMiddleware } from "../middlewares"

class UsersRoute implements Route {
  public basePath = "/users"
  public router = Router()

  private usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {}
}

export default UsersRoute
