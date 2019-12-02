import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private barcodeScanner: BarcodeScanner) {}

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {})
      .catch(err => {});
  }
}
