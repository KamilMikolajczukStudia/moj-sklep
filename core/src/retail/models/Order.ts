import { IOrderDao } from '../daos'
import { IOrderDto } from '../dtos'
import { Product } from '../../domain/models/Product'

export class Order {
  readonly id: number
  readonly price: number
  readonly products: Product[]

  constructor(order: IOrderDao) {
    this.id = order.id
    this.price = order.price
    this.products = order.products.map((p) => new Product(p))
  }

  dto(): IOrderDto {
    const { products, ...rest } = this

    return { ...rest, products: products.map(p => p.dto()) }
  }
}
