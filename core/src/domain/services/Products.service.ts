import { ProductRepository } from "../../Imports"

export class ProductService {
  private productRepository = new ProductRepository()

  public async getAllProducts() {
    return this.productRepository.allProducts()
  }
}
