import { Money } from "./Money"
import { Variant } from "./Variant"
import { IProductDao } from "../daos"
import { IProductDto } from "../dtos"


export class Product {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly price: Money
  readonly img: string
  readonly unit: string
  readonly discount: Money
  readonly variants: Variant[]

  constructor(product: IProductDao) {
    this.id = product.productId
    this.name = product.name
    this.description = product.description

    this.price = new Money(product.price)
    this.img = product.img
    this.unit = product.unit
    this.discount = new Money(product.discount)

    const variantsQuantity = product.variantsQuantity.split(",")
    this.variants = product.variants.length
      ? product.variants
          .split(",")
          .map((name, i) => new Variant(name, parseInt(variantsQuantity[i])))
      : []
  }

  public dto(): IProductDto {
    const { price, discount, variants, ...rest } = this

    return {
      ...rest,
      price: price.toNumber(),
      discount: discount.toNumber(),
      variants: variants.map((v) => v.dto()),
    }
  }
}
