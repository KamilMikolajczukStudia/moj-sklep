import { IUserDao } from "./daos"
import { query } from "../../Query"
import { ERoles, User, UserNotFoundExeception } from "../../../../core"
import { IInsertUserDto } from "../../../../core/src/authentication/_dtos"

export class UserRepository {
  public async withId(id: number) {
    const daos = await query<IUserDao>(
      `select * from users where userId = ${id}`
    )

    if (daos.length === 0) {
      throw new UserNotFoundExeception(id)
    }

    return this.daoTouser(daos[0])
  }

  private daoTouser(user: IUserDao): User {
    return new User(user.userId, user.login, user.password, ERoles.normal)
  }

  public async loginExists(login: string) {
    const daos = await query(`select userId from users where login = ?`, [
      login,
    ])

    return daos.length > 0
  }

  public async withLoginOptional(login: string) {
    const daos = await query<IUserDao>(`select * from users where login = ?`, [
      login,
    ])

    if (daos.length === 0) {
      return null
    }

    return this.daoTouser(daos[0])
  }

  public async addNew(userDto: IInsertUserDto) {
    const [user] = await query<IUserDao>(
      `insert into users values (NULL, ?, ?, 0)`,
      [userDto.login, userDto.password]
    )

    return this.daoTouser(user)
  }
}
