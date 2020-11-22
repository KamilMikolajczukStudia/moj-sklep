import { or, cmp, select, insert } from '../Imports'

import { IOperationDao } from '../models/daos'
import { Operation } from '../models/Operation'
import { UserRepository } from './User.repository'
import { IInsertOperationDto } from '../models/dtos'
import { OperationNotFoundExeception } from '../exceptions'

export class OperationRepository {
  userRepository = new UserRepository()

  public async withId(id: number) {
    const daos = await select<IOperationDao>()
      .from('operations')
      .where(cmp<IOperationDao>('operationId', '=', id))
      .run()

    if (daos.length === 0) {
      throw new OperationNotFoundExeception(id)
    }

    return new Operation(daos[0])
  }

  public async addNew(operationDto: IInsertOperationDto) {
    const [operationDao] = await insert
      .into<IOperationDao>('operations', 'operationId')
      .values({
        operationId: -1,
        ...operationDto,
        isoDate: new Date().toISOString()
      })
      .run()

    return operationDao
  }

  public async operationsOf(userId: number) {
    return select<IOperationDao>()
      .from('operations')
      .where(
        or(
          cmp<IOperationDao>('userFrom', '=', userId),
          cmp<IOperationDao>('userTo', '=', userId)
        )
      )
      .run()
  }
}
