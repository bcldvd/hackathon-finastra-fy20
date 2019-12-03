import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const nodeRedLoc = '23.96.41.108:1880';
const rootUrl = `http://${nodeRedLoc}`;
const wsUri = `ws://${nodeRedLoc}/ws/payment-statuses`;

@Injectable({
  providedIn: 'root'
})
export class PaymentInitService {

  constructor(
    private http: HttpClient
  ) { }

  postPaymentInit(options: PaymentInitInterface) {
    const url = `${rootUrl}/payment-init`;
    return this.http.post(url, options);
  }

  getWsUri(): string {
    return wsUri;
  }
}

export interface PaymentInitInterface {
  iban: string;
  amount: number;
}
