import { App } from "../App"

import AuthRoute from "./auth.route"
import IndexRoute from "./index.route"
import UsersRoute from "./users.route"
import OperationsRoute from "./operations.route"

App.useRoute(new IndexRoute())
App.useRoute(new UsersRoute())
App.useRoute(new AuthRoute())
App.useRoute(new OperationsRoute())
