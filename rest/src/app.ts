import * as hpp from "hpp"
import * as cors from "cors"
import * as logger from "morgan"
import * as helmet from "helmet"
import * as express from "express"
import * as cookieParser from "cookie-parser"

import { errorMiddleware } from "./middlewares"
import { Route } from "./routes/routes.interface"

export class App {
  public app: express.Application
  public port: number
  public env: boolean

  constructor(routes: Route[]) {
    this.app = express()
    this.port = parseInt(process.env.PORT) || 3333
    this.env = process.env.NODE_ENV === "production"

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp())
      this.app.use(helmet())
      this.app.use(logger("combined"))
      this.app.use(cors({ origin: /localhost/, credentials: true }))
    } else {
      this.app.use(logger("dev"))
      this.app.use(cors({ origin: /localhost/, credentials: true }))
    }

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes(routes: Route[]) {
    for (const { router } of routes) {
      this.app.use("/", router)
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}
