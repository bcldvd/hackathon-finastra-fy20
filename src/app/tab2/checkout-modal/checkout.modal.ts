import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { PaymentInitService } from 'src/app/shared/payment-init.service';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.html'
})
export class CheckoutModal implements OnInit {
  @Input() amountToPay: number;

  qrCodeData: string;
  paymentDone: boolean;

  constructor(
    public modalController: ModalController,
    public paymentInitService: PaymentInitService,
  ) {}

  ngOnInit() {
    this.qrCodeData = this.amountToPay.toString();
    this.wsConnect();
  }

  wsConnect() {
    this.paymentInitService.getPaymentsSubject().subscribe((msg) => {
      this.paymentDone = true;
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  nextCustomer() {
    this.modalController.dismiss({
      nextCustomer: true
    });
  }
}
