export interface CreditCardModel {
  creditCardNumber: string;
  cardHolderName: string;
  expirationDate: Date;
  amount: number;
  securityCode?: string;
}
