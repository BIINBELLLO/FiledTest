import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreditCardModel } from "./credit-card-model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CardPaymentService {
  constructor(private httpClient: HttpClient) {}

  createNewCardPayment(payload: CreditCardModel) {
    this.httpClient.post(``, payload).pipe(
      map((response) => {
        return {
          newCard: response,
        };
      })
    );
  }
}
