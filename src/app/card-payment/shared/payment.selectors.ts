import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PaymentState } from "src/app/models/payment-state";
import { paymentFeatureKey } from "./payment.reducer";

export const selectPaymentState = createFeatureSelector<PaymentState>(
  paymentFeatureKey
);

export const selectPayments = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.payments
);
