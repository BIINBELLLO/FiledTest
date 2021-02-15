import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardPaymentComponent } from "./card-payment/card-payment.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "add-new", component: CardPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
