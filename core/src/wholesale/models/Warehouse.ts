import { Product } from 'domain'
import { WarehouseRepository } from 'wholesale/repositories'

export class Warehouse {
  private warehouseRepository = new WarehouseRepository()

  constructor() {}

  async has(product: Product, quantity: number) {
    return (
      (await this.warehouseRepository.productQuantity(product.id)) <= quantity
    )
  }
}
