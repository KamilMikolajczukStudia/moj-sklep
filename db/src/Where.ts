import { IRow, ICondition } from "./Imports.app"

type TOperation = "=" | "<" | ">" | "<=" | ">=" | "!="

class And<TRow extends IRow> implements ICondition<TRow> {
  constructor(private a: ICondition<TRow>, private b: ICondition<TRow>) {}

  value(row: TRow) {
    return this.a.value(row) && this.b.value(row)
  }

  toSql() {
    return `(${this.a.toSql()} and ${this.b.toSql()})`
  }
}

class Or<TRow extends IRow> implements ICondition<TRow> {
  constructor(private a: ICondition<TRow>, private b: ICondition<TRow>) {}

  value(row: TRow) {
    return this.a.value(row) || this.b.value(row)
  }

  toSql() {
    return `(${this.a.toSql()} or ${this.b.toSql()})`
  }
}

class Cmp<TRow extends IRow> implements ICondition<TRow> {
  constructor(
    private left: string | number,
    private operation: TOperation,
    private right: string | number
  ) {}

  value(row: IRow) {
    const L = this.getValue(this.left, row)
    const R = this.getValue(this.right, row)

    switch (this.operation) {
      case "=":
        return L === R
      case "<":
        return L < R
      case ">":
        return L > R
      case "<=":
        return L <= R
      case ">=":
        return L >= R
      case "!=":
        return L !== R
    }
  }

  toSql() {
    return `(${this.left} ${this.operation} ${this.right})`
  }

  private getValue(option: string | number, row: IRow) {
    if (typeof option === "number") return option

    return this.isString(option) ? this.stringVal(option) : row[option]
  }

  private isString(val: string) {
    return val.startsWith('"') || val.startsWith('"')
  }

  private stringVal(val: string) {
    return val.replace(/'|"/g, "")
  }
}

export function and<TRow extends IRow>(
  a: ICondition<TRow>,
  b: ICondition<TRow>
) {
  return new And<TRow>(a, b)
}

export function or<TRow extends IRow>(
  a: ICondition<TRow>,
  b: ICondition<TRow>
) {
  return new Or<TRow>(a, b)
}

export function cmp<TRow extends IRow>(
  a: string | number,
  o: TOperation,
  b: string | number
) {
  return new Cmp<TRow>(a, o, b)
}
