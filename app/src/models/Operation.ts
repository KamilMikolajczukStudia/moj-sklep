import { IOperationDao } from "./daos"
import { IOperationDto } from "../../interfaces/dtos"
import { User } from "./User"
import { UserRepository } from "../repositories"

export class Operation {
  private static userRepository = new UserRepository()

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

  public async dto(byUser: User) {
    let { date, userFrom, amount, userTo, ...rest } = this

    let userName: string

    if (userFrom === byUser.id) {
      amount *= -1
      userName = (await Operation.userRepository.withId(userTo)).login
    } else {
      userName = (await Operation.userRepository.withId(userFrom)).login
    }

    return {
      ...rest,
      userName,
      amount,
      isoDate: date.toISOString(),
    } as IOperationDto
  }
}
