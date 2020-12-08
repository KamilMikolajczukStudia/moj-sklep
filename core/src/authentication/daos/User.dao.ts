import { IRow } from "../../../interfaces/db"

export interface IUserDao extends IRow {
  userId: number
  login: string
  password: string
}