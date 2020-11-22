import { IRow, IUpdate, ISetable, IWhereable, ICondition } from "./Imports.app"

import { select } from "./Select"
import { exportTable } from "./helpers/cache"

class Update<TRow extends IRow> implements IUpdate {
  constructor(
    private tableName: string,
    private values: [keyof TRow, TRow[keyof TRow]][],
    private conditions: ICondition<TRow>[]
  ) {}

  async run() {
    const data = await select<TRow>().from(this.tableName).run()

    const newData = data.map((row) =>
      this.conditions.every((con) => con.value(row)) ? this.update(row) : row
    )

    await exportTable(this.tableName, newData)
  }

  private update(_row: TRow) {
    const row = { ..._row }

    for (const [col, value] of this.values) {
      row[col] = value
    }

    return row
  }
}

class WhereAble<TRow extends IRow> implements IWhereable<TRow> {
  constructor(
    private tableName: string,
    private values: [keyof TRow, TRow[keyof TRow]][]
  ) {}

  where(...conditions: ICondition<TRow>[]) {
    return new Update<TRow>(this.tableName, this.values, conditions)
  }
}

class SetAble<TRow extends IRow> implements ISetable<TRow> {
  constructor(private tableName: string) {}

  set(...values: [keyof TRow, TRow[keyof TRow]][]) {
    return new WhereAble(this.tableName, values)
  }
}

export function update<TRow extends IRow>(tableName: string) {
  return new SetAble<TRow>(tableName)
}
