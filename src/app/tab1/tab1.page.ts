import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { TransactionsModal } from './transactions-modal/transactions-modal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  constructor(
    public toastController: ToastController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    //this.simulatePaymentReceived();
  }

  addChild() {}

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
