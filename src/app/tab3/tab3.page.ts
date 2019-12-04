import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { NO_CORDOVA, CATEGORY_IONIC_ICON_MAPPER } from '../shared/data';
import { PaymentInitService } from '../shared/payment-init.service';
import { MOCK_TRANSACTIONS, TransactionByDate } from '../shared/data';

Chart.defaults.global.legend.labels.usePointStyle = true;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  total: number;
  transactions: TransactionByDate[];
  labels: any[] = [];
  date = 'Dec 2019';
  balance = 54.85;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private paymentInitService: PaymentInitService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.transactions = MOCK_TRANSACTIONS;

    this.refreshData();
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        if (!barcodeData.cancelled) {
          this.requestForPayment(parseFloat(barcodeData.text));
        }
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
      if ((data as any).accepted) {
        this.total += amount;
        this.balance -= amount;
        this.displayConfirmationToast();
      } else {
        this.displayPendingTransaction();
      }
    });
  }

  async displayPendingTransaction() {
    const alert = await this.alertController.create({
      header: 'Pending Transaction',
      message: 'This transaction is waiting for an approval.'
    });

    await alert.present();
  }

  async displayConfirmationToast() {
    const toast = await this.toastController.create({
      message: 'Payment done',
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

  mapCategoryToIonicIconName(category: string): string {
    return CATEGORY_IONIC_ICON_MAPPER[category];
  }

  refreshData() {
    this.labels.length = 0;
    this.total = 0;

    const trans = this.transactions.find(t => t.date === this.date);
    const data = trans.transactions.reduce((acc, item) => {
      if (acc[item.category]) {
        acc[item.category] += item.amount;
      } else {
        acc[item.category] = item.amount;
      }
      return acc;
    }, {});

    const values = Object.keys(data).map(category => data[category]);
    values.forEach(val => this.total += val);
    const max = Math.max(...values);

    Object.keys(data).forEach(category => this.labels.push({
      label: category,
      pct: ((data[category] / this.total) * 100).toFixed(2),
      progressBarAmount: data[category] / this.total,
      amount: data[category]
    }));

    this.labels.sort((a, b) => b.pct - a.pct);
    values.sort((a, b) => b - a);

    const colors = [];
    this.labels.forEach(item => {
      switch (item.label) {
        case 'House': {
          colors.push('#5bc1d7');
          break;
        }
        case 'Food': {
          colors.push('#d2d755');
          break;
        }
        case 'Clothing': {
          colors.push('#694ed6');
          break;
        }
        case 'Transportation': {
          colors.push('#c137a2');
          break;
        }
        case 'Donations': {
          colors.push('#f0b323');
          break;
        }
      }
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels.map(item => `${item.label}  ${item.pct}%`),
        datasets: [
          {
            label: 'Expenses',
            data: values,
            backgroundColor: colors
          }
        ]
      },
      options: {
        cutoutPercentage: 60,
        responsive: true,
        legend: {
          position: 'right'
        }
      }
    });
  }
}
