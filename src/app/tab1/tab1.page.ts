import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { TransactionsModal } from './transactions-modal/transactions-modal';
import { PaymentInitService } from '../shared/payment-init.service';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, delay, map, flatMap, takeWhile, repeatWhen, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  paymentReceived$: Subject<any>;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private paymentInitService: PaymentInitService,
  ) {}

  ngOnInit() {
    // this.simulatePaymentReceived()
    this.longPollPaymentsReceived(1000).subscribe(data => {
      this.presentNewPaymentToast('francine');
    });
  }

  addChild() {}

  longPollPaymentsReceived(delayMs: number) {
    return this.paymentInitService.getPaymentsStatuses().pipe(
      repeatWhen(obs => obs.pipe(delay(delayMs))),
      filter(data => this.checkPaymentsStatuses(data)),
      take(1)
    );
  }

  private checkPaymentsStatuses(data): boolean {
    return data.payments[0].status === 'VALID';
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
    const childName = 'Francine'
    this.presentNewPaymentToast(childName);
  }
}
