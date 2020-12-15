import { Exception } from "../../utils"
import { Variant, Product, Money } from "../../domain"
import { IOrderedProductDto } from "../../retail/dtos/OrderedProduct.dto"

export class OrderedProduct {
  readonly price: Money
  readonly product: Product
  readonly variant: Variant
  readonly quantity: number

  constructor(product: Product, variant: Variant, quantity: number) {
    this.product = product
    this.variant = variant
    this.quantity = Math.round(quantity)

    if (this.quantity <= 0) {
      throw new Exception(`Ujemna ilość produktu "${product.name}" x ${this.quantity}`)
    }

    this.price = product.price.times(this.quantity)
  }

  dto(): IOrderedProductDto {
    return {
      product: this.product.dto(),
      variant: this.variant.dto(),
      quantity: this.quantity,
    }
  }
}
