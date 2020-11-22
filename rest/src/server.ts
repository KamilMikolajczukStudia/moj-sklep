// import './dotenv/config'

import { App } from './App'
import AuthRoute from './routes/auth.route'
import IndexRoute from './routes/index.route'
import UsersRoute from './routes/users.route'
import OperationsRoute from './routes/operations.route'

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new OperationsRoute()
])

app.listen()
