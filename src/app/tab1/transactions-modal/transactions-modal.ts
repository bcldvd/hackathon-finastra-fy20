import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MOCK_TRANSACTIONS, TransactionByDate, CATEGORY_IONIC_ICON_MAPPER, Transaction } from '../../shared/data';

@Component({
  selector: 'transactions-modal',
  styleUrls: ['./transactions-modal.scss'],
  templateUrl: './transactions-modal.html'
})
export class TransactionsModal implements OnInit {
  @Input() childName: string;
  @Input() newTransactionAmount: number;

  transactions: TransactionByDate[];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.simulateTransactions();
    if (this.newTransactionAmount) {
      this.addNewTransaction(this.newTransactionAmount);
    }
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

  private addNewTransaction(amount: number) {
    const newTransaction: Transaction = {
      name: `Finastra's Hackathon`,
      category: 'Food',
      amount,
      new: true
    };
    this.transactions[0].transactions.unshift(newTransaction);
  }
}
