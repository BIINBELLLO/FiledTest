import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardPaymentComponent } from "./card-payment/card-payment.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BsDatepickerModule } from "ngx-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from "./home/home.component";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { storageSyncMetaReducer } from "ngrx-store-persist";

@NgModule({
  declarations: [AppComponent, CardPaymentComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
    }),
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [storageSyncMetaReducer],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
