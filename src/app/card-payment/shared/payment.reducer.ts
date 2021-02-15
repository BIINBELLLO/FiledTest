import { Action, createReducer, on } from "@ngrx/store";
import { PaymentState } from "src/app/models/payment-state";
import { makePayments } from "./payment.actions";

export const paymentFeatureKey = "paymentState";

// export interface PaymentState {

// }

export const initialState: PaymentState = {
  payments: [],
};

const paymentReducer = createReducer(
  initialState,
  on(makePayments, (state, { payload }) => ({
    ...state,
    payments: [...state.payments, payload],
  }))
);

export function reducer(state: PaymentState | undefined, action: Action) {
  return paymentReducer(state, action);
}
