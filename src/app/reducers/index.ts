import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { reducer } from "../card-payment/shared/payment.reducer";
import { AppState } from "../models/app-state";

// export interface AppState {

// }

export const reducers: ActionReducerMap<AppState> = {
  paymentState: reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
