import { IRow } from "./helpers/IRow"
import { ICondition } from "./helpers/ICondition"

export interface IUpdate {
  run(): Promise<void>
}

export interface IWhereable<TRow extends IRow> {
  where(...conditions: ICondition<TRow>[]): IUpdate
}

export interface ISetable<TRow extends IRow> {
  set(...values: [keyof TRow, TRow[keyof TRow]][]): IWhereable<TRow>
}

export type IUpdateable<TRow extends IRow> = (
  tableName: string
) => ISetable<TRow>
