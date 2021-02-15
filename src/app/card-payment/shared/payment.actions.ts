import { createAction, props } from "@ngrx/store";
import { CreditCardModel } from "./credit-card-model";

export const makePayments = createAction(
  "[Payment] Make Payments",
  props<{ payload: CreditCardModel }>()
);
