import { IsBoolean, IsString } from 'class-validator'

import { INewUserDto, ILoginUserDto } from '../Imports'

export class SignUpUserDto implements INewUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string

  constructor(login: string, password: string) {
    this.login = login
    this.password = password
  }
}

export class SignInUserDto implements ILoginUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string

  @IsBoolean()
  public rememberMe: boolean

  constructor(login: string, password: string, rememberMe: boolean) {
    this.login = login
    this.password = password
    this.rememberMe = rememberMe
  }
}
