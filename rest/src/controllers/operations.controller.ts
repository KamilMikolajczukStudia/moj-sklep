import { NextFunction, Response } from "express"

import { RequestWithUser } from "../interfaces/auth.interface"

import { OperationDto } from "../dtos"
import { OperaionsService } from "../Imports"

export class OperationsController {
  private operationsService = new OperaionsService()

  public createOperation = async (
    req: RequestWithUser<OperationDto>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user
    const operationDto = req.body

    try {
      const operation = await this.operationsService.createOperation(
        operationDto,
        user
      )

      res
        .status(201)
        .json({ data: operation.dto(), message: "createOperation" })
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

    try {
      const operations = await this.operationsService.getAllUserOperations(user)

      res.status(201).json({
        data: await Promise.all(operations.map((op) => op.dto(user))),
        message: "allOperations",
      })
    } catch (error) {
      next(error)
    }
  }
}
