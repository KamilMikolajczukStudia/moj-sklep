import { NextFunction, Request, Response } from 'express'

export class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send('<h1>It works</h1>')
    } catch (error) {
      next(error)
    }
  }
}
