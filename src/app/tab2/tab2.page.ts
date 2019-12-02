import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { CheckoutModal } from './checkout-modal/checkout.modal';

const NO_CORDOVA = 'cordova_not_available';
const MOCK_ITEMS = [
  {
    name: 'Sandwich',
    price: 2.73,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    name: 'Coke zero',
    price: 1,
    quantity: 1,
    image:
      'https://images-na.ssl-images-amazon.com/images/I/51oL595FSrL._SX425_.jpg'
  }
];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  data: string;
  items: Item[];
  totalPrice: number;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.data = `Barcode data ${JSON.stringify(barcodeData)}`;
      })
      .catch(err => {
        if (err === NO_CORDOVA) {
          this.items = MOCK_ITEMS;
          this.updateTotal();
        } else {
          this.data = `Error ${JSON.stringify(err)}`;
        }
      });
  }

  updateTotal() {
    this.totalPrice = this.items.reduce((prev, next) => {
      return (prev += next.price);
    }, 0);
  }

  async checkout() {
    const modal = await this.modalController.create({
      component: CheckoutModal,
      componentProps: {
        amountToPay: this.totalPrice
      }
    });
    return await modal.present();
  }
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
  image: string;
}
