import { IProductDao } from "./Product.dao"

export class IOrderDao {
  id: number
  price: number
  products: IProductDao[]
}
