import { Router } from 'express'

import Route from '../interfaces/routes.interface'
import { NewOperationDto } from '../dtos/operation.dto'
import authMiddleware from '../middlewares/auth.middleware'
import OperationsController from '../controllers/operations.controller'
import validationMiddleware from '../middlewares/validation.middleware'

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
      validationMiddleware(NewOperationDto),
      this.operationsController.createOperation
    )
  }
}
