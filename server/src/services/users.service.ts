import { writeFile } from 'fs'
import * as path from 'path'

import HttpException from '../exceptions/HttpException'
import { User } from '../interfaces/User'
import users from '../models/users.model'

class UserService {
  private static users = users

  public async addMoney(user: User, amount: number) {
    const newSet = UserService.users.map((u) =>
      u.id === user.id ? new User({ ...user, money: u.money + amount }) : u
    )

    await this.save(newSet)

    return this.selectOne(u => u.id === user.id)
  }

  private async save(newSet: User[]) {
    return new Promise((resolve, rejects) =>
      writeFile(
        path.join(__dirname, '../models/users.json'),
        JSON.stringify(newSet, undefined, 2) + '\n',
        (err) => {
          if (err) rejects(err)
          else {
            UserService.users = newSet
            resolve()
          }
        }
      )
    )
  }

  public async updateLimit(user: User, limit: number) {
    const newSet = UserService.users.map((u) =>
      u.id === user.id ? new User({ ...user, limit: limit }) : u
    )

    await this.save(newSet)

    return this.selectOne(u => u.id === user.id)
  }

  public async select(callback?: (user: User) => boolean) {
    return callback ? UserService.users.filter(callback) : UserService.users
  }

  public async selectOne(callback: (user: User) => boolean) {
    return UserService.users.find(callback)
  }

  public async selectById(userId: number) {
    const findUser = this.selectOne((user) => user.id === userId)

    if (!findUser) throw new HttpException(409, 'Użytkownik nie znaleziony')

    return findUser
  }

  public async nextId() {
    return UserService.users.reduce((id, user) => Math.max(id, user.id), 0) + 1
  }

  public async addUser(user: User): Promise<void> {
    const newSet = [...UserService.users, user]

    return new Promise((resolve, rejects) =>
      writeFile(
        path.join(__dirname, '../models/users.json'),
        JSON.stringify(newSet, undefined, 2) + '\n',
        (err) => {
          if (err) rejects(err)
          else {
            UserService.users = newSet
            resolve()
          }
        }
      )
    )
  }
}

export default UserService
