import { User, Operation } from '../models'
import { AuthExeception } from '../exceptions'
import { UserRepository } from '../repositories'
import { INewOperationDto } from '../../interfaces/dtos'
import { OperationRepository } from '../repositories/Operation.repository'

export class OperaionsService {
  private userRepository = new UserRepository()
  private operationRepository = new OperationRepository()

  public async createOperation(
    operationData: INewOperationDto,
    user: User
  ): Promise<Operation> {
    const { userTo, amount } = operationData

    if (!user.canAfford(amount)) {
      throw new AuthExeception(403, `Osiągnięto limit`)
    }

    await this.userRepository.addMoney(user.id, -amount)
    await this.userRepository.addMoney(userTo, amount)

    return new Operation(
      await this.operationRepository.addNew({
        ...operationData,
        userFrom: user.id,
        isoDate: new Date().toISOString()
      })
    )
  }

  public async getAllUserOperations(user: User) {
    return (await this.operationRepository.operationsOf(user.id)).map(
      (op) => new Operation(op)
    )
  }
}
