export const NO_CORDOVA = 'cordova_not_available';

export interface TransactionByDate {
  date: string;
  transactions: Transaction[];
}

export interface Transaction {
  name: string;
  amount: number;
  category: string;
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

export const MOCK_TRANSACTIONS: TransactionByDate[] = [
  {
    date: 'Today',
    transactions: [
      {
        name: `Finastra's Hackathon`,
        category: 'Food',
        amount: 3.73
      }
    ]
  },
  {
    date: 'Tuesday 03 December 2019',
    transactions: [
      {
        name: 'RATP',
        category: 'Transportation',
        amount: 1.9
      },
      {
        name: 'Uber',
        category: 'Transportation',
        amount: 11.55
      },
      {
        name: 'Uniqlo',
        category: 'Clothing',
        amount: 14.99
      },
      {
        name: 'McDonalds',
        category: 'Food',
        amount: 24.13
      },
      {
        name: 'IKEA furniture',
        category: 'House',
        amount: 120.05
      },
      {
        name: 'Dinner table',
        category: 'House',
        amount: 55.99
      },
      {
        name: 'Sushi Ko',
        category: 'Food',
        amount: 32.8
      }
    ]
  }
];