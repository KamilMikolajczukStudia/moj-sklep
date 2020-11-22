import { Router } from 'express'

import { Route } from './routes.interface'
import { IndexController } from '../controllers'

class IndexRoute implements Route {
  public path = '/'
  public router = Router()

  private indexController = new IndexController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index)
  }
}

export default IndexRoute
