import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.html'
})
export class CheckoutModal implements OnInit {
  @Input() amountToPay: number;
  qrCodeData: string;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.qrCodeData = this.amountToPay.toString();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
