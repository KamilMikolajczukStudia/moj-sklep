import { NextFunction, Response } from "express"

import { OrderProposal, OrderPosition, UserService } from "../Imports"

import { AnnonimusRequest, RequestWithUser } from "../interfaces/auth.interface"

export class WholesaleController {
  private discountsService = new DiscountsService()
  
  public validateOrder = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user

    const order = new OrderProposal(this.loadOrderPosition(), user)
    order.save()

    if (order.checkAvailability()) {
      if (order.requiresAcceptance()) {
        const toAccept = order.acceptOrderBy(UserService.Menager)
        toAccept.save()

        res.status(200).json({ data: toAccept.dto(), message: "order-requires-acceptance-by-menager" })
      }
      else {
        const orderWithDiscounts = order.addDiscounts(this.discountsService.discountsFor(user))
        orderWithDiscounts.save()

        res.status(200).json({ data: orderWithDiscounts.dto(), message: "order-accepted" })
      }
    }
    else {
      const proposition = order.proposeNewOrderProposal()
      proposition.save()

      res.status(200).json({ data: proposition.dto(), message: "order-proposition" })
    }
  }

  private loadOrderPosition(): OrderPosition[] {
    return []
  }
}
