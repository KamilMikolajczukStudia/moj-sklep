import { IUserDto } from "../../authentication/dtos"
import { IOrderedProductDto } from "./OrderedProduct.dto"

export interface IRetailOrderDto {
  id: number
  user: IUserDto
  products: IOrderedProductDto[]
  price: number
}
