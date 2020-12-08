import { Product } from "../../core"

export * from "../../db"

export class SuppliersService {
  isAviable(product: Product, quantity: number) {
    return quantity < 20
  }

  deliveryProduct(product: Product, quantity: number) {
    return { product, deliveryDate: new Date(Date.now() + (3 + quantity * 0.1) * 60 * 60 * 24) }
  }
}
