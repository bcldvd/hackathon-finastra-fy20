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
  balance = 3250;
  kidBalanceList = [{
    name: "Francine",
    limit: 65,
    balance: 35,
    pct: 0
  },
  {
    name: "Axel",
    limit: 150,
    balance: 140,
    pct: 0
  }]

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private paymentInitService: PaymentInitService,
  ) {}

  ngOnInit() {
    this.wsConnect();
    for(let i =0; i< this.kidBalanceList.length; i++) {
      this.kidBalanceList[i].pct = (1 - (this.kidBalanceList[i].balance / this.kidBalanceList[i].limit)) * 100;
    }
  }

  wsConnect() {
    this.payment$ = this.paymentInitService.getPaymentsSubject().subscribe((msg) => {
      this.presentNewPaymentToast('Francine', msg);
    });
  }

  async displayTransactions(childName: string, newTransactionAmount?: number) {
    const modal = await this.modalController.create({
      component: TransactionsModal,
      componentProps: {
        childName,
        newTransactionAmount
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

  async presentNewPaymentToast(childName: string, newTransactionAmount: number) {
    const toast = await this.toastController.create({
      header: 'New payment from Francine',
      message: 'Click to Close',
      position: 'bottom',
      buttons: [
        {
          text: 'See',
          handler: () => {
            this.displayTransactions(childName, newTransactionAmount);
          }
        }
      ]
    });
    toast.present();
  }

  private simulatePaymentReceived() {
    const childName = 'Francine';
    const newTransactionAmount = 4;
    this.presentNewPaymentToast(childName, newTransactionAmount);
  }

  ionViewDidLeave() {
    this.payment$.unsubscribe();
  }
}
