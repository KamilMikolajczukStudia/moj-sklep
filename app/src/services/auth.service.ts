import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { User } from '../models'
import { AuthExeception } from '../exceptions'
import { UserRepository } from '../repositories'
import { DataStoredInToken, TokenData } from './Auth.interface'
import { INewUserDto, ILoginUserDto } from '../../interfaces/dtos'

import * as config from '../config.json'

export class AuthService {
  private static initialMoney = 200
  private static initialLimit = 500

  private userRepository = new UserRepository()

  public async signUp(userDto: INewUserDto) {
    if (await this.userRepository.loginExists(userDto.login)) {
      throw new AuthExeception(401, `Twój login '${userDto.login}' jest zajęty`)
    }

    return new User(
      await this.userRepository.addNew({
        ...userDto,
        isAdmin: 0,
        limit: AuthService.initialLimit,
        money: AuthService.initialMoney,
        password: await this.generatePasswordHash(userDto.password),
        cardNumber: this.generateCardNumber()
      })
    )
  }

  public async signIn(userData: ILoginUserDto) {
    const user = await this.userRepository.withLoginOptional(userData.login)

    if (!user) {
      throw new AuthExeception(401, `Login lub hasło nieprawidłowe`)
    }

    const isPasswordMatching = await bcrypt.compare(
      userData.password,
      user.password
    )

    if (!isPasswordMatching) {
      throw new AuthExeception(401, 'Login lub hasło nieprawidłowe')
    }

    const tokenData = this.createToken(
      user.id,
      userData.rememberMe ? 24 * 60 : 60
    )
    const cookie = this.createCookie(tokenData)

    return { cookie, user }
  }

  public async signOut(userData: User) {
    const user = await this.userRepository.withLoginOptional(userData.login)

    if (!user) {
      throw new AuthExeception(401, 'Użytkownik niezalogowany')
    }

    return user
  }

  public async verify(token: string) {
    try {
      const verificationResponse = jwt.verify(
        token,
        config.JWT_SECRET
      ) as DataStoredInToken
      
      const user = await this.userRepository.withId(verificationResponse.id)

      return user
    } catch {}

    return null
  }

  /**
   * @param expiresTime in minutes
   */
  private createToken(userId: number, expiresTime: number) {
    const dataStoredInToken: DataStoredInToken = { id: userId }
    const secret = config.JWT_SECRET
    const expiresIn = 60 * expiresTime

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    } as TokenData
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }

  private async generatePasswordHash(password: string) {
    return bcrypt.hash(password, 10)
  }

  private generateCardNumber() {
    return Math.floor(Math.random() * 1e16).toLocaleString('pl-PL', {
      minimumIntegerDigits: 16
    })
  }
}
