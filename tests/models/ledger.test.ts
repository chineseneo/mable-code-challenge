import { Ledger } from '../../src/models/ledger';
import Account from '../../src/models/account';

describe('Ledger', () => {
  it('should create a ledger', () => {
    const ledger = new Ledger([new Account('1234567890', 1000)]);
    expect(ledger.accounts).toHaveLength(1);
  });

  it('should process a transaction', () => {
    const ledger = new Ledger([new Account('1234567890', 1000), new Account('1234567891', 0)]);
    ledger.processTransaction({ from: '1234567890', to: '1234567891', amount: 100 });
    expect(ledger.accounts[0].getBalance()).toBe(900);
    expect(ledger.accounts[1].getBalance()).toBe(100);
  });

  it('should not process a transaction if the account is not found', () => {
    const ledger = new Ledger([new Account('1234567890', 1000)]);
    expect(() => ledger.processTransaction({ from: '1234567891', to: '1234567890', amount: 100 })).toThrow('Account not found');
  });

  it('should process multiple transactions', () => {
    const ledger = new Ledger([new Account('1234567890', 1000), new Account('1234567891', 0)]);
    ledger.processTransactions([{ from: '1234567890', to: '1234567891', amount: 100 }, { from: '1234567890', to: '1234567891', amount: 100 }]);
    expect(ledger.accounts[0].getBalance()).toBe(800);
    expect(ledger.accounts[1].getBalance()).toBe(200);
  });
});