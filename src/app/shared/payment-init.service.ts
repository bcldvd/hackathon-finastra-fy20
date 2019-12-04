import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { retry } from 'rxjs/operators';

const nodeRedLoc = '23.96.41.108:1880';
const rootUrl = `http://${nodeRedLoc}`;
const wsUri = `ws://${nodeRedLoc}/ws/payment-statuses`;

@Injectable({
  providedIn: 'root'
})
export class PaymentInitService {
  ws: WebSocket;
  payment$: any = webSocket(wsUri).pipe(
    retry()
  );

  constructor(
    private http: HttpClient
  ) { }

  postPaymentInit(options: PaymentInitInterface) {
    const url = `${rootUrl}/payment-init`;
    return this.http.post(url, options);
  }

  getPaymentsSubject() {
    return this.payment$;
  }
}

export interface PaymentInitInterface {
  iban: string;
  amount: number;
}
