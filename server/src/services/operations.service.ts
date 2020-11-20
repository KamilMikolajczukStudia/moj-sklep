import * as path from 'path'
import { writeFile } from 'fs'

import UserService from './users.service'
import { User } from '../interfaces/User'
import Operation from '../models/Operation'
import operations from '../models/operations.model'
import { NewOperationDto } from '../dtos/operation.dto'
import HttpException from '../exceptions/HttpException'

class OperaionsService {
  private static operations = operations
  private userService = new UserService()

  public async select(callback?: (operations: Operation) => boolean) {
    return callback
      ? OperaionsService.operations.filter(callback)
      : OperaionsService.operations
  }

  public async selectOne(callback: (operations: Operation) => boolean) {
    return OperaionsService.operations.find(callback)
  }

  public async selectById(operationsId: number) {
    const findOperation = this.selectOne(
      (operations) => operations.id === operationsId
    )

    if (!findOperation) throw new HttpException(409, 'Operacja nie znaleziona')

    return findOperation
  }

  public async nextId() {
    return (
      OperaionsService.operations.reduce(
        (id, operations) => Math.max(id, operations.id),
        0
      ) + 1
    )
  }

  public async addOperation(
    operationData: NewOperationDto,
    user: User
  ): Promise<Operation> {
    const { userTo, title, amount } = operationData
    const id = await this.nextId()
    const userFrom = user.id

    const operation = new Operation({
      id,
      userFrom,
      userTo,
      title,
      amount,
      isoDate: new Date().toISOString()
    })

    await this.userService.addMoney(user, -amount)
    await this.userService.addMoney(
      await this.userService.selectOne((u) => u.id === userTo),
      amount
    )

    return new Promise((resolve, rejects) =>
      writeFile(
        path.join(__dirname, '../models/operations.json'),
        JSON.stringify(
          [...OperaionsService.operations, operation].map((op) => op.getData()),
          undefined,
          2
        ) + '\n',
        (err) => {
          if (err) rejects(err)
          else {
            OperaionsService.operations.push(operation)
            resolve(operation)
          }
        }
      )
    )
  }
}

export default OperaionsService
