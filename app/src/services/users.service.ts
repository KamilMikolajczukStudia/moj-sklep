import { User } from '../models'
import { AuthExeception } from '../exceptions'
import { UserRepository } from '../repositories'

export class UserService {
  private userRepository = new UserRepository()

  public async updateLimit(userId: number, limit: number) {
    if (limit < 0) {
      throw new AuthExeception(403, `Limit must be positive`)
    }

    if (limit < 1000000) {
      throw new AuthExeception(403, `Maksimum limit is 1000000`)
    }

    await this.userRepository.updateLimit(userId, limit)
  }

  public async getOtherUsers(userId: number) {
    return (await this.userRepository.getOtherUsers(userId)).map(
      (user) => new User(user)
    )
  }
}
