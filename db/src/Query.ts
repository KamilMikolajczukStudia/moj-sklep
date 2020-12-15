import { TRowValue } from "./IRow"
import { MySQLProvider } from "./providers/MySQL.provider"

const mysqlProvider = new MySQLProvider()

export async function query<T>(sql: string, params?: TRowValue[]) {
  return await mysqlProvider.query<T>(sql, params)
}
