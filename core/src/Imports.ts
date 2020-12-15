import { Product } from "../../core"

export * from "../../db"

export class SuppliersService {
  isAviable(product: Product, quantity: number) {
    return quantity < Math.random() * 30 + 10
  }

  deliveryProduct(product: Product, quantity: number) {
    return {
      product,
      deliveryDate: new Date(
        Date.now() +
          (3 + quantity * 0.1 + (Math.random() - 0.5) * 2) * 60 * 60 * 24
      ),
    }
  }
}
