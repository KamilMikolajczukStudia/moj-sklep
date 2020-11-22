import * as path from 'path'

import { exists, readFile, writeFile } from './utils'

interface IStore {
  [k: string]: any[]
}

const tables: IStore = {}

function tableLocation(tableName: string) {
  return path.join(__dirname, `../../data/${tableName}.json`)
}

export async function importTable<T>(tableName: string): Promise<T[]> {
  if (tables[tableName]) return tables[tableName]

  if (!(await exists(tableLocation(tableName)))) {
    throw new Error(`DB error table don't exists '${tableName}'`)
  }

  const table: T[] = JSON.parse(await readFile(tableLocation(tableName)))

  if (!Array.isArray(table)) {
    throw new Error(`DB error table format '${tableName}'`)
  }

  tables[tableName] = table

  console.info(`DB: Table loaded ${tableName} and cached`)

  return table
}

export async function exportTable<T>(tableName: string, table: T[]) {
  tables[tableName] = table

  await writeFile(
    tableLocation(tableName),
    JSON.stringify(table, null, 2) + '\n'
  )
}
