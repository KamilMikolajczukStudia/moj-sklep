import { NextFunction, Request, Response } from "express"

import { HttpException } from "../exceptions"

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = error.status || 500
  const message: string = error.message || " Coś poszło nie tak"

  console.error("[ERROR] ", status, message)
  console.error(error)

  res.status(status).json({ message })
}
