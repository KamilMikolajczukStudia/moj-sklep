import { createConnection, Connection } from "mysql"

import { TRowValue } from "../IRow"

export class MySQLProvider {
  private connection: Connection | null = null

  constructor() {}

  startConnection() {
    if (this.connection !== null) {
      return
    }

    this.connection = createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "moj_sklep",
    })

    this.connection.connect()
  }

  query<T extends Object>(sql: string, params: TRowValue[] = []): Promise<T[]> {
    this.startConnection()

    return new Promise((resolve, rejects) => {
      this.connection?.query(sql, params, (error, results, fields) => {
        if (error) {
          return rejects(error)
        }

        resolve(results)
      })
    })
  }

  endConnection() {
    this.connection?.end()
  }
}
