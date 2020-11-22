import * as fs from "fs"

export function readFile(path: string): Promise<string> {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => (err ? rej(err) : res(data.toString())))
  })
}

export function writeFile(path: string, data: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => (err ? rej(err) : res()))
  })
}

export function exists(fileOrDIr: string): Promise<boolean> {
  return new Promise((res, rej) => {
    fs.access(
      fileOrDIr,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
      (err) => res(!err)
    )
  })
}
