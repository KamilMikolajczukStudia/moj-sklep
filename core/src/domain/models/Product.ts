import { Money } from "./Money"
import { Variant } from "./Variant"
import { IProductDto } from "../dtos"
import { Exception } from "../../utils"

export class Product {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly price: Money
  readonly img: string
  readonly unit: string
  /**
   * Orginal price or 0
   */
  readonly discount: Money
  readonly variants: Variant[]

  constructor(
    id: number,
    name: string,
    description: string,
    price: Money,
    img: string,
    unit: string,
    variants: Variant[],
    discount = Money.Zero
  ) {
    if (name.length === 0) {
      throw new Exception(`Product name must not be empty`)
    }

    if (price.lessThen(Money.Zero)) {
      throw new Exception(`Product ${name} price must be positive`)
    }

    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.img = img
    this.unit = unit
    this.variants = variants
    this.discount = discount.lessThenEqual(price) ? Money.Zero : discount
  }

  isOnPromotion() {
    return this.discount.lessThenEqual(Money.Zero)
  }

  promotionAmount() {
    return this.isOnPromotion() ? this.discount.subtract(this.price) : Money.Zero
  }

  dto(): IProductDto {
    const { price, discount, variants, ...rest } = this

    return {
      ...rest,
      price: price.toNumber(),
      discount: discount.toNumber(),
      variants: variants.map((v) => v.dto()),
    }
  }
}
