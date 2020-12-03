import { Router } from "express"

import { Route } from "./routes.interface"
import { authMiddleware } from "../middlewares"
import { ProductsController } from "../controllers"

export default class ProductsRoute implements Route {
  public basePath = "/products"
  public router = Router()
  public productssController = new ProductsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}`,
      this.productssController.allProducts
    )
  }
}
