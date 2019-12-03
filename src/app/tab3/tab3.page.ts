import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Chart } from "chart.js";
import { NO_CORDOVA } from '../shared/data';
import { PaymentInitService } from '../shared/payment-init.service';
import { MOCK_TRANSACTIONS, TransactionByDate } from '../shared/data';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  transactions: TransactionByDate[];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private paymentInitService: PaymentInitService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.transactions = MOCK_TRANSACTIONS;

    const data = this.transactions[1].transactions.reduce((acc, item) => {
      if (acc[item.category]) {
        acc[item.category] += item.amount;
      } else {
        acc[item.category] = item.amount;
      }
      return acc;
    }, {})

    let total = 0;
    const values = Object.keys(data).map(category => data[category]);
    values.forEach(val => total += val);

    let labels = [];
    Object.keys(data).forEach(category => labels.push({
      label: category,
      pct: ((data[category] / total) * 100).toFixed(2)
    }))

    labels.sort((a, b) => b.pct - a.pct);
    values.sort((a, b) => b - a);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: labels.map(item => `${item.label} ${item.pct}%`),
        datasets: [
          {
            label: "Expenses",
            data: values,
            backgroundColor: [
              "#694ed6",
              "#c137a2",
              "#e40046",
              "#5bc1d7",
              "#f0b323",
              "#56c271",
              "#ff8a3d"
            ]
          }
        ]
      },
      options: {
        legend: {
          position: 'right'
        }
      }
    });
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
