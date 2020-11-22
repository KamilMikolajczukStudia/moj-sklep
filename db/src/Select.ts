import { IRow, ISelect, IFromble, ICondition } from "./Imports.app"

import { importTable } from "./helpers/cache"

export class Select<TRow extends IRow = IRow> implements ISelect<TRow> {
  constructor(
    private columns: (keyof TRow)[],
    private tables: string[],
    private conditions: ICondition<TRow>[] = [],
    private order?: string,
    private _limit?: number,
    private _offset = 0,
    private orderDesc = false
  ) {}

  where(...conditions: ICondition<TRow>[]) {
    const res = this.clone()
    res.conditions = [...this.conditions, ...conditions]

    return res
  }

  orderBy(column: string, direction: "asc" | "desc" = "asc") {
    const res = this.clone()
    res.order = column
    res.orderDesc = direction.toLowerCase() === "desc"

    return res
  }

  limit(limit: number, offset = 0) {
    const res = this.clone()
    res._limit = limit

    if (offset !== undefined) {
      res._offset = offset
    }

    return res
  }

  toSql() {
    return `
    select
      ${this.columns.join(", ")}
    from
      ${this.tables.join(", ")}
    ${
      this.conditions.length
        ? `where
    ${this.conditions.map((con) => con.toSql()).join(" and \n  ")}`
        : ``
    }
    ${
      this.order !== undefined
        ? `order by ${this.order} ${this.orderDesc ? "desc" : "asc"}`
        : ``
    }
    ${this._limit !== undefined ? `limit ${this._limit}` : ``}
    ${this._offset !== undefined ? `offset ${this._offset}` : ``}
    `
  }

  async run() {
    const [first, ...others] = this.tables

    let rows = await importTable<TRow>(first)

    for (const tableName of others) {
      const table = await importTable<TRow>(tableName)

      rows = ([] as TRow[]).concat(
        ...table.map((el: TRow) => rows.map((row: TRow) => ({ ...row, ...el })))
      )
    }

    let filtered = rows.filter((row) =>
      this.conditions.every((con) => con.value(row))
    )

    if (this.order !== undefined) {
      const order = this.order

      filtered.sort((a, b) => {
        const val =
          typeof a[order] === "number"
            ? (a[order] as number) - (b[order] as number)
            : (a[order] as string).localeCompare(b[order] as string)

        return this.orderDesc ? -val : val
      })
    }

    if (this._limit !== undefined) {
      filtered = filtered.slice(this._offset, this._offset + this._limit)
    }

    if (this.columns.length > 0) {
      return filtered.map((row) =>
        this.columns.reduce(
          (acc, col) => ({ ...acc, [col]: row[col] }),
          {} as TRow
        )
      )
    }

    return filtered
  }

  clone() {
    return new Select<TRow>(
      this.columns,
      this.tables,
      this.conditions,
      this.order,
      this._limit,
      this._offset,
      this.orderDesc
    )
  }
}

class FromAble<TRow extends IRow> implements IFromble<TRow, Select<TRow>> {
  constructor(private columns: (keyof TRow)[]) {}

  from(...tables: string[]) {
    return new Select<TRow>(this.columns, tables)
  }
}

export function select<TRow extends IRow>(...columns: (keyof TRow)[]) {
  return new FromAble<TRow>(columns)
}
