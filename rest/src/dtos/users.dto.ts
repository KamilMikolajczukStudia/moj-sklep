import { IsBoolean, IsPositive, IsString } from 'class-validator'

import { INewUserDto, ILoginUserDto } from '../Imports'

export class SignUpUserDto implements INewUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string
}

export class SignInUserDto implements ILoginUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string

  @IsBoolean()
  public rememberMe: boolean
}

export class LimitDto {
  @IsPositive()
  public limit: number
}
