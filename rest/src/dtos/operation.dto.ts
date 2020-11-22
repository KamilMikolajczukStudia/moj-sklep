import { IsPositive, IsString } from 'class-validator'

import { INewOperationDto } from '../Imports'

export class OperationDto implements INewOperationDto {
  @IsString()
  public title: string

  @IsPositive()
  public amount: number

  @IsPositive()
  public userTo: number
}
