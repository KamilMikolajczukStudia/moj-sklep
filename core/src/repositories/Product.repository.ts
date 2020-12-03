import { cmp, select } from "../Imports"

import { IProductDao } from "../models/daos"
import { Product } from "../models/Product"
import { UserRepository } from "./User.repository"
import { ProductNotFoundExeception } from "../exceptions"

export class ProductRepository {
  userRepository = new UserRepository()

  public async withId(id: number) {
    const daos = await select<IProductDao>()
      .from("products")
      .where(cmp<IProductDao>("productId", "=", id))
      .run()

    if (daos.length === 0) {
      throw new ProductNotFoundExeception(id)
    }

    return new Product(daos[0])
  }

  public async allProducts() {
    return select<IProductDao>().from("products").run()
  }
}
