import { IRow, IInsert, IInsertable, IValuesable } from "./Imports.app"

import { select } from "./Select"
import { exportTable } from "./helpers/cache"

class Insert<TRow extends IRow> implements IInsert<TRow> {
  constructor(
    private tableName: string,
    private values: TRow[],
    private autoIncrementColumn?: keyof TRow
  ) {}

  async run() {
    const data = await select<TRow>().from(this.tableName).run()
    let values = data

    if (this.autoIncrementColumn !== undefined) {
      const aiCol = this.autoIncrementColumn

      const id =
        ((
          await select<TRow>()
            .from(this.tableName)
            .orderBy(aiCol as string, "desc")
            .limit(1)
            .run()
        )[0][aiCol] as number) + 1

      values = this.values.map((el, i) => ({ ...el, [aiCol]: id + i }))
    }

    const newData = [...data, ...values]

    await exportTable<TRow>(this.tableName, newData)

    return values
  }
}

class ValueAble<TRow extends IRow> implements IValuesable<TRow> {
  constructor(private tableName: string, private autoIncrementColumn?: keyof TRow) {}

  values(...values: TRow[]) {
    return new Insert(this.tableName, values, this.autoIncrementColumn)
  }
}

class InsertAble implements IInsertable {
  into<TRow extends IRow>(tableName: string, autoIncrementColumn?: keyof TRow) {
    return new ValueAble<TRow>(tableName, autoIncrementColumn)
  }
}

export const insert = new InsertAble()
