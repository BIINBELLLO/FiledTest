import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AppState } from "../models/app-state";
import { CardPaymentService } from "./shared/card-payment.service";
import { CreditCardModel } from "./shared/credit-card-model";
import { makePayments } from "./shared/payment.actions";

@Component({
  selector: "app-card-payment",
  templateUrl: "./card-payment.component.html",
  styleUrls: ["./card-payment.component.scss"],
})
export class CardPaymentComponent implements OnInit, OnDestroy {
  minDate: Date;
  newPaymentForm: FormGroup;
  cardDetail: CreditCardModel;
  sub: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private cardPaymentService: CardPaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initMinDate();
    this.initNewPaymentForm();
  }

  initMinDate() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  initNewPaymentForm() {
    this.newPaymentForm = this.formBuilder.group({
      creditCardNumber: ["", [Validators.required, Validators.maxLength(16)]],
      cardHolderName: ["", Validators.required],
      expirationDate: ["", Validators.required],
      securityCode: ["", [Validators.minLength(3), Validators.maxLength(3)]],
      amount: ["", [Validators.required, Validators.min(1)]],
    });
  }

  valueValidatorForAmountField() {
    return /^\d*\.?\d*$/.test(this.newPaymentForm.get("amount").value);
  }

  digitsValueValidator(key: string) {
    return /^\d*$/.test(this.newPaymentForm.get(key).value);
  }

  noneDigitsValueValidator() {
    return /^[A-Za-z ]*$/.test(this.newPaymentForm.get("cardHolderName").value);
  }

  completePayment() {
    this.newPaymentForm.markAllAsTouched();
    if (this.newPaymentForm.invalid) {
      this.toastr.error(`Invalid Entries Detected!`);
    } else {
      this.cardDetail = this.newPaymentForm.value;
      // I am dispatching the action to the store irrespective of the http call result because
      // I know that there is no api endpoint to receive the call.
      // This would have been on the success section if there was a real api endpoint to send the request to

      this.spinner.show();

      this.sub.add(
        this.cardPaymentService
          .createNewCardPayment(this.cardDetail)
          .subscribe({
            next: (result) => {
              this.store.dispatch(makePayments({ payload: this.cardDetail }));
              this.spinner.hide();
              this.toastr.success(`Card payment successful!`);
              this.initNewPaymentForm();
              this.router.navigate(["/"]);
            },
            error: (e) => {
              this.store.dispatch(makePayments({ payload: this.cardDetail }));
              this.spinner.hide();
              this.toastr.info(
                `Card payment failed due to unavailability of API endpoint!`
              );
              this.toastr.success(`Details added to the store!`);
              this.initNewPaymentForm();
              this.router.navigate(["/"]);
            },
          })
      );
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
