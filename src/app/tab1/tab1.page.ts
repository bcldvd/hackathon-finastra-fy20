import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
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
  kidBalanceList: any[];

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private paymentInitService: PaymentInitService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.wsConnect();

    this.transactions = MOCK_TRANSACTIONS;

    const data = [150.41, 130.25, 95.08];
    Object.keys(this.transactions).forEach(key => {
      let total = 0;
      this.transactions[key].transactions.forEach((t: Transaction) => {
        total += t.amount;
      });
      data.push(+total.toFixed(2));
    });

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
        },
        {
          label: 'Axel',
          backgroundColor: '#efcce7',
          borderColor: '#c137a2',
          fill: true,
          data: [54.18, 75.05, 120.99, 82.07, 65.55, 15.23]
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Expense History'
        },
        scales: {
          yAxes: [{
            type: 'linear',
            ticks: {
              beginAtZero: true,
              stepSize: 50,
              userCallback: function (tick) {
                return '$' + tick.toString();
              }
            },
          }]
        }
      }
    });

    this.kidBalanceList = [{
      name: "Francine",
      limit: 64.38,
      balance: 64.38 - MOCK_TRANSACTIONS[1].transactions.map(t => t.amount).reduce((a,b) => a + b),
      pct: (1 - (64.38 - MOCK_TRANSACTIONS[1].transactions.map(t => t.amount).reduce((a,b) => a + b))/64.38) * 100
    },
    {
      name: "Axel",
      limit: 150,
      balance: 135,
      pct: (1 - 135/150) * 100
    }];
  }

  wsConnect() {
    this.payment$ = this.paymentInitService.getPaymentsSubject().subscribe((msg) => {
      const kid = 'Francine';
      if (msg.approved) {
        this.presentNewPaymentToast(kid, msg.amount);
        this.kidBalanceList[0].balance = this.kidBalanceList[0].balance + msg.amount;
      } else {
        this.presentAlertUnusualTransaction(kid, msg.amount);
      }
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

  async presentAlertUnusualTransaction(kid: string, transaction: number) {
    const alert = await this.alertController.create({
      header: 'Unusual transaction request',
      subHeader: `from ${kid}`,
      buttons: [{
        text: 'Agree',
        handler: () => {
          this.agreeToUnusualTransaction(transaction);
        }
      }, {
        text: 'Disagree',
        role: 'cancel',
        handler: () => {
          this.disagreeToUnusualTransaction(transaction);
        },
      }, {
        text: 'More info',
        handler: () => {
          //
        },
      }]
    });

    await alert.present();
  }

  agreeToUnusualTransaction(transaction: number) {

  }

  disagreeToUnusualTransaction(transaction: number) {

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
