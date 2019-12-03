import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const rootUrl = 'http://23.96.41.108:1880';

@Injectable({
  providedIn: 'root'
})
export class PaymentInitService {

  constructor(
    private http: HttpClient
  ) { }

  getPaymentsStatuses() {
    const url = `${rootUrl}/payment-statuses`;
    return this.http.get(url);
  }

  postPaymentInit(options: PaymentInitInterface) {
    const url = `${rootUrl}/payment-init`;
    return this.http.post(url, options);
  }
}

export interface PaymentInitInterface {
  iban: string;
  amount: number;
}
