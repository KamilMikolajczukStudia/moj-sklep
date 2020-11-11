import { IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  public login: string

  @IsString()
  public password: string
}
