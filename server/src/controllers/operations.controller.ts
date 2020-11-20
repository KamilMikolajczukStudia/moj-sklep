import { NextFunction, Response } from 'express'

import { IOperation } from 'models/Operation'
import { NewOperationDto } from '../dtos/operation.dto'
import UserService from '../services/users.service'
import { RequestWithUser } from '../interfaces/auth.interface'
import OperationsService from '../services/operations.service'
import HttpException from '../exceptions/HttpException'

class OperationsController {
  private userService = new UserService()
  private operationsService = new OperationsService()

  public createOperation = async (
    req: RequestWithUser<NewOperationDto>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user
    const operationData = req.body

    try {
      if (user.money - operationData.amount + user.limit < 0) {
        throw new HttpException(402, 'Za mało pieniędzy na koncie')
      }

      const newOperationData = await this.operationsService.addOperation(operationData, user)
      res
        .status(201)
        .json({ data: newOperationData.getData(), message: 'createOperation' })
    } catch (error) {
      next(error)
    }
  }

  public allOperations = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user

    const userOperations = await this.operationsService.select(
      (op) => op.userFrom === user.id || op.userTo === user.id
    )

    const data = await Promise.all(
      userOperations
        .map((op) => op.getData())
        .map((op) => this.ammoutSign(op, user.id))
    )

    res.status(200).json({
      data,
      message: 'allOperations'
    })
  }

  private async ammoutSign(operation: IOperation, id: number) {
    const isIn = operation.userTo === id

    const { otherUser, userFrom, userTo, ...rest } = isIn
      ? { ...operation, otherUser: operation.userFrom }
      : { ...operation, amount: -operation.amount, otherUser: operation.userTo }

    const user = await this.userService.selectOne(
      (user) => user.id === otherUser
    )

    return { ...rest, userName: user.login }
  }
}

export default OperationsController
