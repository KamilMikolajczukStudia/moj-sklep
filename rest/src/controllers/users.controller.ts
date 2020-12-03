import { NextFunction, Response } from "express"

import { UserService } from "../Imports"
import { RequestWithUser } from "../interfaces/auth.interface"

export class UsersController {
  public userService = new UserService()
}
