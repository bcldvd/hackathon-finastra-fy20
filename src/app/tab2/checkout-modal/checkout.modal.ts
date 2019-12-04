import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { PaymentInitService } from 'src/app/shared/payment-init.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.html'
})
export class CheckoutModal implements OnInit {
  @Input() amountToPay: number;

  payment$: Subject<any>;
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
    this.payment$ = this.paymentInitService.getPaymentsSubject().subscribe((msg) => {
      if (msg.approved) {
        this.paymentDone = true;
      } else {
        //
      }
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

  ionViewDidLeave() {
    this.payment$.unsubscribe();
  }
}
