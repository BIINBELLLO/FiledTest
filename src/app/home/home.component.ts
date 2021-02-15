import { Component, OnDestroy, OnInit } from "@angular/core";
import { select } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { CreditCardModel } from "../card-payment/shared/credit-card-model";
import { selectPayments } from "../card-payment/shared/payment.selectors";
import { AppState } from "../models/app-state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  availableCardsFromTheStore$: Observable<Array<CreditCardModel>>;
  availableCardsPayment: Array<CreditCardModel> = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.availableCardsFromTheStore$ = this.store.pipe(select(selectPayments));
    this.sub.add(
      this.availableCardsFromTheStore$.subscribe((result) => {
        this.availableCardsPayment = result;
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
