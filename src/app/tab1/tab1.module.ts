import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TransactionsModal } from './transactions-modal/transactions-modal';
import { AddKidModal } from './add-kid-modal/add-kid-modal';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, TransactionsModal, AddKidModal],
  entryComponents: [TransactionsModal, AddKidModal]
})
export class Tab1PageModule {}
