import {
  Money,
  Product,
  ProductNotFoundExeception,
  Variant,
} from "../../../../core"
import { query } from "../../Query"
import {
  IProductDao,
  IVariantDao,
  IProductVariantDao,
  IVarintsOfProduct,
} from "./daos"

export class ProductRepository {
  public async withId(id: number) {
    const products = await query<IProductDao>(
      `select * from products where productId = ?`,
      [id]
    )

    if (products.length === 0) {
      throw new ProductNotFoundExeception(id)
    }

    const variants = await query<IVarintsOfProduct>(
      `
    select *
    from products_variants pw
    join variants v on v.variantId = pw.variantId
    where pw.productId = ?
    `,
      [id]
    )

    return this.daoToProduct(products[0], variants)
  }

  private daoToProduct(
    product: IProductDao,
    variants: IVarintsOfProduct[]
  ): Product {
    return new Product(
      product.productId,
      product.name,
      product.description,
      new Money(product.price),
      product.img,
      product.unit,
      variants.map((v) => this.daoToVariant(v)),
      new Money(product.discount)
    )
  }

  private daoToVariant(variant: IVarintsOfProduct): Variant {
    return new Variant(variant.name, variant.quantity)
  }

  public async allProducts() {
    const products = await query<IProductDao>(`select * from products`)

    return Promise.all(
      products.map(async (product) => {
        const variants = await query<IVarintsOfProduct>(
          `
      select *
      from products_variants pw
      join variants v on v.variantId = pw.variantId
      where pw.productId = ?
      `,
          [product.productId]
        )

        return this.daoToProduct(product, variants)
      })
    )
  }
}
