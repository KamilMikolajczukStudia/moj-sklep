import { NextFunction, Response } from "express"

import { ProductService } from "../Imports"

import { IProductsAll } from "../endpoints"
import { AnnonimusRequest } from "../interfaces/auth.interface"

export class ProductsController {
  private productsService = new ProductService()

  public allProducts = async (
    req: AnnonimusRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await this.productsService.getAllProducts()

      res.status(201).json({
        data: products.map((p) => p.dto()),
        message: "all-products",
      } as IProductsAll)
    } catch (error) {
      next(error)
    }
  }
}
