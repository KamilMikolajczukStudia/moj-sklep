import { Router } from 'express'

import { Route } from './routes.interface'
import { OperationDto } from '../dtos/Operation.dto'
import { OperationsController } from '../controllers'
import { authMiddleware, validationMiddleware } from '../middlewares'

export default class OperationsRoute implements Route {
  public router = Router()
  public operationsController = new OperationsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `/operations`,
      authMiddleware,
      this.operationsController.allOperations
    )

    this.router.post(
      `/createOperation`,
      authMiddleware,
      validationMiddleware(OperationDto),
      this.operationsController.createOperation
    )
  }
}
