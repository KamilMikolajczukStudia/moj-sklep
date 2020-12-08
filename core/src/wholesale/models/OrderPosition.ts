import { Product } from "../../domain/models/Product"
import { Money } from "../../domain"
import { SuppliersService } from "../../Imports"

export class OrderPosition {
  readonly product: Product
  readonly variant: string
  readonly quantity: number
  readonly price: Money
  readonly deliveryDate: Date

  private static supplier = new SuppliersService()

  constructor(product: Product, variant: string, quantity: number, deliveryDate: Date) {
    this.product = product
    this.variant = variant
    this.quantity = quantity
    this.deliveryDate = deliveryDate
    this.price = product.price.times(quantity)
  }

  isAviable() {
    return OrderPosition.supplier.isAviable(this.product, this.quantity)
  }

  proposeNewPosition() {
    const { product, deliveryDate } = OrderPosition.supplier.deliveryProduct(this.product, this.quantity);

    return new OrderPosition(product, this.variant, this.quantity, deliveryDate)
  }
}
