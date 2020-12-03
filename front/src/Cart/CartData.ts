import { ProductData, Variant } from '../Products'

export class CartData {
  readonly product: ProductData
  readonly variant: Variant
  readonly quantity: number
  readonly price: number

  constructor(_product: ProductData, _variant: Variant, _quantity: number) {
    this.product = _product
    this.variant = _variant
    this.quantity = Math.round(Math.max(0, _quantity))
    this.price = this.quantity * this.product.price
  }

  add(quantity: number) {
    quantity = Math.round(quantity)

    if (quantity <= 0) return this

    return new CartData(this.product, this.variant, this.quantity + quantity)
  }

  remove(quantity: number) {
    quantity = Math.round(quantity)

    if (quantity <= 0 || quantity >= this.quantity) return this

    return new CartData(this.product, this.variant, this.quantity - quantity)
  }
}
