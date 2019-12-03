import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MOCK_TRANSACTIONS, TransactionByDate } from '../../shared/data';

const CATEGORY_IONIC_ICON_MAPPER = {
  Food: 'cafe',
  Transportation: 'train',
  Clothing: 'shirt',
  House: 'house',
  Donation: 'heart'
};

@Component({
  selector: 'transactions-modal',
  styleUrls: ['./transactions-modal.scss'],
  templateUrl: './transactions-modal.html'
})
export class TransactionsModal implements OnInit {
  @Input() childName: string;

  transactions: TransactionByDate[];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.simulateTransactions();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  mapCategoryToIonicIconName(category: string): string {
    return CATEGORY_IONIC_ICON_MAPPER[category];
  }

  private simulateTransactions() {
    this.transactions = MOCK_TRANSACTIONS;
  }
}
