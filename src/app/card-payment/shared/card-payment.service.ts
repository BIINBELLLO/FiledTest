import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreditCardModel } from "./credit-card-model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardPaymentService {
  constructor(private httpClient: HttpClient) {}

  createNewCardPayment(payload: CreditCardModel): Observable<any> {
    return this.httpClient.post(``, payload).pipe(
      map((response) => {
        return {
          result: response,
        };
      })
    );
  }
}
