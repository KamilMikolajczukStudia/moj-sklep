import { Product } from "../models"
import { ProductRepository } from "../repositories"

export class ProductService {
  private productRepository = new ProductRepository()

  public async getAllProducts() {
    return (await this.productRepository.allProducts()).map(
      (op) => new Product(op)
    )
  }
}
