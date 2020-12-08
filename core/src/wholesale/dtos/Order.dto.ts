import { IProductDto } from "../../domain/dtos"

export interface IOrderDto {
  id: number
  products: IProductDto[]
}