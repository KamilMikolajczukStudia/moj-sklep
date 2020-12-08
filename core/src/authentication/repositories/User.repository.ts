import { cmp, select, insert } from '../../Imports'

import { User } from '../models'
import { IUserDao } from '../daos'
import { IInsertUserDto } from '../_dtos'
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
    const [UserDao] = await insert
      .into<IUserDao>('users', 'userId')
      .values({
        userId: -1,
        ...UserDto,
        isoDate: new Date().toISOString()
      })
      .run()

    return UserDao
  }
}
