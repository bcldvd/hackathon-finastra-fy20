import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CheckoutModal } from './checkout-modal/checkout.modal';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    QRCodeModule
  ],
  declarations: [Tab2Page, CheckoutModal],
  entryComponents: [CheckoutModal]
})
export class Tab2PageModule {}
