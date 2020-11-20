import { User } from '../interfaces/User'
import * as users from './users.json'

const userModel = users.map(el => new User(el))

export default userModel
