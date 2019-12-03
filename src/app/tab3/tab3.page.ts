import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PaymentInitService } from '../shared/payment-init.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { NO_CORDOVA } from '../shared/data';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private paymentInitService: PaymentInitService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.requestForPayment(barcodeData);
      })
      .catch(err => {
        if (err === NO_CORDOVA) {
          this.requestForPayment(3.73);
        } else {
          this.displayErrorToast(JSON.stringify(err));
        }
      });
  }

  requestForPayment(amount) {
    const iban = 'TEST_IBAN';
    this.paymentInitService.postPaymentInit({
      iban,
      amount
    }).subscribe(data => {
      this.displayConfirmationToast();
    });
  }

  async displayConfirmationToast() {
    const toast = await this.toastController.create({
      message: 'Payment done',
      // message: 'Click to Close',
      showCloseButton: true,
      duration: 5000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  async displayErrorToast(err) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: err,
      showCloseButton: true,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}
