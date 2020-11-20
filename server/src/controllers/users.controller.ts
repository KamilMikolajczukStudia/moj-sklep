import { NextFunction, Response } from 'express'

import userService from '../services/users.service'
import { RequestWithUser } from '../interfaces/auth.interface'
import { LimitDto } from 'dtos/users.dto'

class UsersController {
  public userService = new userService()

  public getUsersNames = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user

    try {
      const otherUsers = await this.userService.select((u) => u.id !== user.id)

      res.status(200).json({
        data: otherUsers.map(({ id, login, cardNumber }) => ({
          id,
          login: `${login} (${cardNumber})`
        })),
        message: 'otherUsersNames'
      })
    } catch (error) {
      next(error)
    }
  }

  public updateLimit = async (
    req: RequestWithUser<LimitDto>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user
    const limit = req.body.limit

    try {
      const newUser = await this.userService.updateLimit(user, limit)
      res
        .status(201)
        .json({ data: newUser.getData(), message: 'updateUser' })
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
