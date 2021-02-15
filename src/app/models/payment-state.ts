import { CreditCardModel } from "../card-payment/shared/credit-card-model";

export interface PaymentState {
  payments: Array<CreditCardModel>;
}
