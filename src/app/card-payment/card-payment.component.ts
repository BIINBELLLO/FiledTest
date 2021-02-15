import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CreditCardModel } from "./shared/credit-card-model";

@Component({
  selector: "app-card-payment",
  templateUrl: "./card-payment.component.html",
  styleUrls: ["./card-payment.component.scss"],
})
export class CardPaymentComponent implements OnInit {
  minDate: Date;
  newPaymentForm: FormGroup;
  cardDetail: CreditCardModel;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
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
      creditCardNumber: ["", Validators.required],
      cardHolderName: ["", Validators.required],
      expirationDate: ["", Validators.required],
      securityCode: ["", [Validators.maxLength(3)]],
      amount: ["", [Validators.required, Validators.min(1)]],
    });
  }

  completePayment() {
    this.newPaymentForm.markAllAsTouched();
    if (this.newPaymentForm.invalid) {
      this.toastr.error(`Invalid Entries Detected!`);
    } else {
      this.cardDetail = this.newPaymentForm.value;
      console.log(this.cardDetail);
    }
  }
}
