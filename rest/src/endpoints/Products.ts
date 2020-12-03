import { IProductDto } from "../Imports"

export interface IProductsAll {
  message: "all-products"
  data: IProductDto[]
}
