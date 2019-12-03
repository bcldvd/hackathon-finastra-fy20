import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { TransactionsModal } from './transactions-modal/transactions-modal';
import { PaymentInitService } from '../shared/payment-init.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  paymentReceived$: Subject<any>;
  ws: WebSocket;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private paymentInitService: PaymentInitService,
  ) {}

  ngOnInit() {
    this.wsConnect();
  }

  ngOnDestroy() {
    this.ws.close();
  }

  addChild() {}

  wsConnect() {
    this.ws = new WebSocket(this.paymentInitService.getWsUri());
    this.ws.onmessage = (msg) => {
      this.presentNewPaymentToast('Francine');
    }

    this.ws.onopen = () => {
    }
    this.ws.onclose = () => {
    }
  }

  async displayTransactions(childName: string) {
    const modal = await this.modalController.create({
      component: TransactionsModal,
      componentProps: {
        childName
      }
    });
    return await modal.present();
  }

  async presentNewPaymentToast(childName: string) {
    const toast = await this.toastController.create({
      header: 'New payment from Francine',
      message: 'Click to Close',
      position: 'bottom',
      buttons: [
        {
          text: 'See',
          handler: () => {
            this.displayTransactions(childName);
          }
        }
      ]
    });
    toast.present();
  }

  private simulatePaymentReceived() {
    const childName = 'Francine';
    this.presentNewPaymentToast(childName);
  }
}
