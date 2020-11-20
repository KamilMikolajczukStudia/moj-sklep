import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

import UserService from "./users.service"
import { User } from "../interfaces/User"
import { isEmptyObject } from "../utils/util"
import HttpException from "../exceptions/HttpException"
import { SignUpUserDto, SignInUserDto } from "../dtos/users.dto"
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface"

class AuthService {
  private static initialMoney = 200

  private usersService = new UserService()

  public async signUp(userData: SignUpUserDto) {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "Błędne dane")
    }

    const findUser = await this.usersService.selectOne(
      (user) => user.login === userData.login
    )

    if (findUser) {
      throw new HttpException(409, `Twój login '${userData.login}' jest zajęty`)
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const createUserData = new User({
      id: await this.usersService.nextId(),
      ...userData,
      isAdmin: false,
      money: AuthService.initialMoney,
      password: hashedPassword,
      cardNumber: Math.floor(Math.random() * 1e16).toLocaleString("pl-PL", {
        minimumIntegerDigits: 16,
      }),
    })

    await this.usersService.addUser(createUserData)

    return createUserData
  }

  public async signIn(userData: SignInUserDto) {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "Błędne dane")
    }

    const findUser = await this.usersService.selectOne(
      (user) => user.login === userData.login
    )

    if (!findUser) {
      throw new HttpException(
        409,
        `Twój login '${userData.login}' nie został znaleziony`
      )
    }

    const isPasswordMatching = await bcrypt.compare(
      userData.password,
      findUser.password
    )

    if (!isPasswordMatching) {
      throw new HttpException(409, "Błędne hasło")
    }

    const tokenData = this.createToken(findUser, userData.rememberMe ?  24 * 60 : 60)
    const cookie = this.createCookie(tokenData)

    return { cookie, findUser }
  }

  public async signOut(userData: User) {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "Błędne dane")
    }

    const findUser = await this.usersService.selectOne(
      (user) => user.id === userData.id
    )

    if (!findUser) {
      throw new HttpException(409, "Nie znaleziono użytkownika")
    }

    return findUser
  }

  /**
   * @param expiresTime in minutes
   */
  private createToken(user: User, expiresTime: number) {
    const dataStoredInToken: DataStoredInToken = { id: user.id }
    const secret = process.env.JWT_SECRET
    const expiresIn = 60 * expiresTime

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    } as TokenData
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }
}

export default AuthService
