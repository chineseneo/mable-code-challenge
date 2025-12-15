import processTransactions from '../src/processor';

describe('Processor', () => {
  it('should process the given example csv files', () => {
    const ledger = processTransactions('mable_account_balances.csv', 'mable_transactions.csv');
    expect(ledger.toString()).toBe('1111234522226789,4820.5\n1111234522221234,9974.4\n2222123433331212,1550\n1212343433335665,1725.6\n3212343433335755,48679.5');
  });
});
