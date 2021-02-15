import { Component, OnInit } from "@angular/core";
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
export class HomeComponent implements OnInit {
  sub: Subscription = new Subscription();
  availableCardsFromTheStore$: Observable<Array<CreditCardModel>>;
  availableCards: Array<CreditCardModel> = [
    {
      creditCardNumber: "1234 6543 6534 6789",
      cardHolderName: "John James Doe",
      expirationDate: new Date(),
      amount: 750,
      securityCode: "234",
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.availableCardsFromTheStore$ = this.store.pipe(select(selectPayments));
    this.availableCardsFromTheStore$.subscribe((result) => {
      console.log(result);
    });
  }
}
