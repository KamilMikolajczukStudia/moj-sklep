import { IsBoolean, IsPositive, IsString } from 'class-validator'

export class SignUpUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string
}

export class SignInUserDto {
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
