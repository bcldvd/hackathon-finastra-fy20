import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

const MOCK_TRANSACTIONS: TransactionByDate[] = [
  {
    date: 'Today',
    transactions: [
      {
        name: `Finastra's Hackathon`,
        category: 'food',
        amount: 3.73
      }
    ]
  },
  {
    date: 'Tuesday 03 December 2019',
    transactions: [
      {
        name: 'RATP',
        category: 'transportation',
        amount: 1.9
      },
      {
        name: 'Uniqlo',
        category: 'clothing',
        amount: 14.99
      }
    ]
  }
];

const CATEGORY_IONIC_ICON_MAPPER = {
  food: 'cafe',
  transportation: 'train',
  clothing: 'shirt'
}

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

export interface TransactionByDate {
  date: string;
  transactions: Transaction[];
}

export interface Transaction {
  name: string;
  amount: number;
  category: string;
}