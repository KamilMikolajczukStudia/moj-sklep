import { IRow } from "./IRow"

export interface ICondition<TRow extends IRow> {
  value(row: TRow): boolean
  toSql(): string
}
