export type TRowValue = number | string | Date | null

export interface IRow {
  [k: string]: TRowValue
}
