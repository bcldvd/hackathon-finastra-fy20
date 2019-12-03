import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { CheckoutModal } from './checkout-modal/checkout.modal';
import { NO_CORDOVA } from '../shared/data';
import { OpenFoodFactsService, Product } from '../shared/openfoodfacts.service';

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
  items: Item[] = [];
  totalPrice: number;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public modalController: ModalController,
    public openFoodFactsService: OpenFoodFactsService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        if (barcodeData.cancelled) {
          this.displayErrorToast('Product not found in database');
        } else {
          this.openFoodFactsService.getInfoFromBarCode(barcodeData.text).subscribe(data => {
            const item = this.createItemFromOpenFoodFactsData(data);
            this.addtoItems(item);
            this.updateTotal();
          }, (err) => {
            this.displayErrorToast(err);
          });
        }
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

  private createItemFromOpenFoodFactsData(data: Product): Item {
    return {
      name: data.product_name_fr,
      image: data.image_thumb_url,
      quantity: 1,
      code: data.code,
      price: 1
    };
  }

  private addtoItems(newItem: Item) {
    const itemFound = this.items.findIndex(item => item.code === newItem.code);
    if (itemFound > -1) {
      this.items[itemFound].quantity++;
    } else {
      this.items.push(newItem);
    }
  }

  updateTotal() {
    this.totalPrice = this.items.reduce((prev, next: Item) => {
      return (prev += (next.price * next.quantity));
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

  async displayErrorToast(err) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: err.toString().replace('Error: ', ''),
      showCloseButton: true,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
  image: string;
  code?: string;
}
