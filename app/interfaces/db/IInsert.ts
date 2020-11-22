import { IRow } from "./helpers/IRow"

export interface IInsert<TRow extends IRow> {
  run(): Promise<TRow[]>
}

export interface IValuesable<TRow extends IRow> {
  values(...values: TRow[]): IInsert<TRow>
}

export interface IInsertable {
  into<TRow extends IRow>(
    tableName: string,
    autoIncrementColumn?: keyof TRow
  ): IValuesable<TRow>
}
