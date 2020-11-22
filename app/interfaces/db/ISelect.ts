import { IRow } from "./helpers/IRow"
import { ICondition } from "./helpers/ICondition"

export interface ISelect<TRow extends IRow> {
  where(...conditions: ICondition<TRow>[]): ISelect<TRow>

  orderBy(column: string, direction?: "asc" | "desc"): ISelect<TRow>

  limit(limit: number, offset?: number): ISelect<TRow>

  toSql(): string

  run(): Promise<TRow[]>

  clone(): ISelect<TRow>
}

export interface IFromble<TRow extends IRow, TSelect extends ISelect<TRow>> {
  from(...tables: string[]): TSelect
}

export type ISelectable<TRow extends IRow> = (
  ...columns: (keyof TRow)[]
) => IFromble<TRow, ISelect<TRow>>
