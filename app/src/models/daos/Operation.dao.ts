import { IRow } from "../../../interfaces/db"

export interface IOperationDao extends IRow {
  operationId: number
  userFrom: number
  userTo: number
  amount: number
  title: string
  isoDate: string
}
