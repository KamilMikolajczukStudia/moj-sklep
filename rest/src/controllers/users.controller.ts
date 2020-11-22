import { NextFunction, Response } from 'express'

import { UserService } from '../Imports'
import { LimitDto } from '../dtos/Users.dto'
import { RequestWithUser } from '../interfaces/auth.interface'

export class UsersController {
  public userService = new UserService()

  public getUsersNames = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user

    try {
      const otherUsers = await this.userService.getOtherUsers(user.id)

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
      await this.userService.updateLimit(user.id, limit)

      res.status(201).json({ message: 'updateUser' })
    } catch (error) {
      next(error)
    }
  }
}
