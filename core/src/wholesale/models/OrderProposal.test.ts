import { User } from "../../authentication/models"
import { Money, Product } from "../../domain"
import { OrderPosition } from "./OrderPosition"
import { OrderProposal } from "./Order"
import { UserService } from "../../authentication/services"
import { PaidOrder } from "./PaidOrder"
import { Payment } from "./Payment"

class OrderException {}

function describe(title: string, test: () => void) {}
function test(title: string, test: () => void) {}
function expect(
  value: any
): {  toThrow(e: any): void, toBeTruthy(): void , not: {toBeTruthy(): void }, toBeInstanceOf(klass: any): void } {}

const testUser = UserService.Menager
const testExpensiveProduct = new Product()
const testExpensiveProductPosition = new OrderPosition()

function giveOrderWithProductWorth(value: number): OrderProposal {
  new OrderProposal([new OrderPosition(new Product({ id: -1, price: value }))])
}

function givePaymentWorth(value: number): Payment {
  return new Payment(Money.from(value))
}

describe("OrderProposal", () => {
  test("Order worth above 50 000 PLN should require approval", () => {
    const order = giveOrderWithProductWorth(55000)
    const requiresAcceptance = order.requiresAcceptance()
    expect(requiresAcceptance).toBeTruthy()
  })

  test("Order worth below 50 000 PLN should not require approval", () => {
    const order = giveOrderWithProductWorth(45000)
    const requiresAcceptance = order.requiresAcceptance()
    expect(requiresAcceptance).not.toBeTruthy()
  })

  test("Payment worth equal to the value of the order should accept the order", () => {
    const order = giveOrderWithProductWorth(100)
    const payment = givePaymentWorth(100)
    const paidOrder = order.payForOrder(payment)
    expect(paidOrder).toBeInstanceOf(PaidOrder)
  })

  test("Payment worth not equal to the value of the order should not accept the order", () => {
    const order = giveOrderWithProductWorth(100)
    const payment = givePaymentWorth(50)
    expect(() => order.payForOrder(payment)).toThrow(OrderException)
  })



})
