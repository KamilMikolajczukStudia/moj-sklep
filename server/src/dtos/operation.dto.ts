import { IsPositive, IsString } from 'class-validator'

export class NewOperationDto {
  @IsString()
  public title: string

  @IsPositive()
  public amount: number

  @IsPositive()
  public userTo: number
}
