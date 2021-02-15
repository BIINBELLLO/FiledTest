import { Component, OnInit } from "@angular/core";
import { CreditCardModel } from "../card-payment/shared/credit-card-model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  availableCards: Array<CreditCardModel> = [
    {
      creditCardNumber: "1234 6543 6534 6789",
      cardHolderName: "John James Doe",
      expirationDate: new Date(),
      amount: 750,
      securityCode: "234",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
