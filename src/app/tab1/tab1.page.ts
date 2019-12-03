import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { TransactionsModal } from './transactions-modal/transactions-modal';
import { PaymentInitService } from '../shared/payment-init.service';
import { Subject } from 'rxjs';
import { AddKidModal } from './add-kid-modal/add-kid-modal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  payment$: Subject<any>;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private paymentInitService: PaymentInitService,
  ) {}

  ngOnInit() {
    this.wsConnect();
  }

  wsConnect() {
    this.payment$ = this.paymentInitService.getPaymentsSubject().subscribe((msg) => {
      this.presentNewPaymentToast('Francine');
    });
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

  async addChild() {
    const modal = await this.modalController.create({
      component: AddKidModal
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

  ionViewDidLeave() {
    this.payment$.unsubscribe();
  }
}
