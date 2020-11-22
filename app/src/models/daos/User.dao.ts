import { IRow } from "../../../interfaces/db"

export interface IUserDao extends IRow {
  userId: number
  login: string
  money: number
  limit: number
  isAdmin: number
  password: string
  cardNumber: string
}