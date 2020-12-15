import { IRow } from "../../../IRow"

export interface IUserDao extends IRow {
  userId: number
  login: string
  password: string
}
