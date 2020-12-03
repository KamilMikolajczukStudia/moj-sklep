import { IProductDto } from "../../../interfaces/dtos";

export interface IOrderDto {
  id: number
  price: number
  products: IProductDto[]
}
