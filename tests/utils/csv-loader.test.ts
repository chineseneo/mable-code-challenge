import { loadAccountBalances, loadTransactions } from '../../src/utils/csv-loader';
import Account from '../../src/models/account';

describe('CsvLoader', () => {
  it('should load account balances', () => {
    const accountBalances = loadAccountBalances('tests/fixtures/mable_account_balances.csv');
    expect(accountBalances).toEqual([
      new Account('1111234522226789', 5000.00),
      new Account('1111234522221234', 10000.00),
      new Account('2222123433331212', 550.00),
      new Account('1212343433335665', 1200.00),
      new Account('3212343433335755', 50000.00),
    ]);
  });

  it('should load transactions', () => {
    const transactions = loadTransactions('tests/fixtures/mable_transactions.csv');
    expect(transactions).toEqual([
      { from: '1111234522226789', to: '1212343433335665', amount: 500.00 },
      { from: '3212343433335755', to: '2222123433331212', amount: 1000.00 },
      { from: '3212343433335755', to: '1111234522226789', amount: 320.50 },
      { from: '1111234522221234', to: '1212343433335665', amount: 25.60 },
    ]);
  });

  it('should throw an error if the file does not exist', () => {
    expect(() => loadAccountBalances('tests/fixtures/nonexistent.csv')).toThrow('File tests/fixtures/nonexistent.csv does not exist');
  });

  it('should throw an error if the file is not a CSV', () => {
    expect(() => loadAccountBalances('tests/fixtures/not_a_csv.txt')).toThrow('File tests/fixtures/not_a_csv.txt is not a CSV');
  });
});
