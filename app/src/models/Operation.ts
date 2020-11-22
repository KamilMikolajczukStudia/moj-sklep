import { IOperationDao } from "./daos"
import { IOperationDto } from "../../interfaces/dtos"

export class Operation {
  id: number
  userFrom: number
  userTo: number
  amount: number
  title: string
  date: Date

  constructor(operation: IOperationDao) {
    this.id = operation.operationId
    this.title = operation.title
    this.userTo = operation.userTo
    this.amount = operation.amount
    this.userFrom = operation.userFrom

    this.date = new Date(operation.isoDate)
  }

  public dto() {
    const { date, ...rest } = this

    return { ...rest, isoDate: date.toISOString() } as IOperationDto
  }
}
