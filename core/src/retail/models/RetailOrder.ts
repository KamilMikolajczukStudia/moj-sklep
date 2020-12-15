import { IOrderDto } from "../dtos"
import { Money } from "../../domain"
import { User } from "../../authentication/models"
import { OrderedProduct } from "./OrderdProduct"

export class RetailOrder {
  readonly id: number
  readonly user: User
  readonly products: OrderedProduct[]

  private price = Money.Zero

  constructor(id: number, user: User, products: OrderedProduct[]) {
    this.id = id
    this.user = user
    this.products = products
  }

  Price() {
    if (!this.price.equal(Money.Zero)) {
      return this.price
    }

    this.price = this.products.reduce((acc, p) => acc.add(p.price), Money.Zero)

    return this.price
  }

  dto(): IOrderDto {
    const { products, ...rest } = this

    return { ...rest, products: products.map((p) => p.dto()) }
  }
}
