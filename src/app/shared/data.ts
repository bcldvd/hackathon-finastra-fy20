export const NO_CORDOVA = 'cordova_not_available';

export const CATEGORY_IONIC_ICON_MAPPER = {
  Food: 'cafe',
  Transportation: 'train',
  Clothing: 'shirt',
  House: 'home',
  Donation: 'heart'
};

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
    date: 'Dec 2019',
    transactions: [
      {
        name: `Finastra's Hackathon`,
        category: 'Food',
        amount: 5.73
      },
      {
        name: `RATP`,
        category: 'Transportation',
        amount: 3.8
      }
    ]
  },
  {
    date: 'Nov 2019',
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
        amount: 34.99
      },
      {
        name: 'McDonalds',
        category: 'Food',
        amount: 24.13
      },
      {
        name: 'IKEA furniture',
        category: 'House',
        amount: 60.05
      },
      {
        name: 'Dinner table',
        category: 'House',
        amount: 25.99
      },
      {
        name: 'Sushi Ko',
        category: 'Food',
        amount: 12.8
      },
      {
        name: 'WWF',
        category: 'Donation',
        amount: 6.50
      }
    ]
  }
];