import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';
import { PaymentInitService } from '../shared/payment-init.service';
import { AddKidModal } from './add-kid-modal/add-kid-modal';
import { TransactionsModal } from './transactions-modal/transactions-modal';
import { TransactionByDate, MOCK_TRANSACTIONS, Transaction } from '../shared/data';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  payment$: Subject<any>;
  transactions: TransactionByDate[];

  private lineChart: Chart;

  @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;

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

    this.transactions = MOCK_TRANSACTIONS;

    let data = [150, 130, 95];
    Object.keys(this.transactions).forEach(key => {
      let total = 0;
      this.transactions[key].transactions.forEach((t: Transaction) => {
        total += t.amount;
      });
      data.push(+total.toFixed(2));
    })

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Francine',
          backgroundColor: '#d9d3f5',
          borderColor: '#694ed6',
          fill: true,
          data
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Expense history'
        },
        scales: {
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick) {
                return '$' + tick.toString();
              }
            },
          }]
        }
      }
    });

    for (let i =0; i < this.kidBalanceList.length; i++) {
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
