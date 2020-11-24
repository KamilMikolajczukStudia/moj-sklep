import { IsNumber, IsString } from 'class-validator'

import { INewOperationDto } from '../Imports'

export class OperationDto implements INewOperationDto {
  @IsString()
  public title: string

  @IsNumber()
  public amount: number

  @IsNumber()
  public userTo: number
}
