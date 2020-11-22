import { cmp, select, insert, update } from '../Imports'

import { User } from '../models/User'
import { IInsertUserDto } from '../models/dtos'
import { IUserDao } from '../models/daos/User.dao'
import { UserNotFoundExeception } from '../exceptions'

export class UserRepository {
  public async withId(id: number) {
    const daos = await select<IUserDao>()
      .from('users')
      .where(cmp<IUserDao>('userId', '=', id))
      .run()

    if (daos.length === 0) {
      throw new UserNotFoundExeception(id)
    }

    return new User(daos[0])
  }

  public async loginExists(login: string) {
    const daos = await select<IUserDao>()
      .from('users')
      .where(cmp<IUserDao>('login', '=', `"${login}"`))
      .run()

    return daos.length > 0
  }

  public async withLoginOptional(login: string) {
    const daos = await select<IUserDao>()
      .from('users')
      .where(cmp<IUserDao>('login', '=', `"${login}"`))
      .run()

    if (daos.length === 0) {
      return null
    }

    return new User(daos[0])
  }

  public async addNew(UserDto: IInsertUserDto) {
    const { isAdmin, ...rest } = UserDto

    const [UserDao] = await insert
      .into<IUserDao>('users', 'userId')
      .values({
        userId: -1,
        ...rest,
        isAdmin: isAdmin ? 1 : 0,
        isoDate: new Date().toISOString()
      })
      .run()

    return UserDao
  }

  public async addMoney(userId: number, amount: number) {
    const money = (await this.withId(userId)).money

    await update<IUserDao>('users')
      .set(['money', money + amount])
      .where(cmp<IUserDao>('userId', '=', userId))
      .run()
  }

  public async updateLimit(userId: number, limit: number) {
    await update<IUserDao>('users')
      .set(['limit', limit])
      .where(cmp('userId', '=', userId))
      .run()
  }

  public async getOtherUsers(userId: number) {
    return select<IUserDao>().from('users').where(cmp('userId', '!=', userId)).run()
  }
}
