import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MOCK_TRANSACTIONS, TransactionByDate, CATEGORY_IONIC_ICON_MAPPER } from '../../shared/data';

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
