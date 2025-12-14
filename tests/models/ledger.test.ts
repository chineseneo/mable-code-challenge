import Ledger from '../../src/models/ledger';
import Account from '../../src/models/account';

// Test constants to avoid magic numbers and hardcoded strings
const accountNumber1 = '1234567890';
const accountNumber2 = '1234567891';
const initialBalance1 = 1000;
const initialBalance2 = 0;
const transferAmount = 100;
const ledgerAccountNotFoundError = 'Account not found';

describe('Ledger', () => {
  it('should create a ledger', () => {
    const ledger = new Ledger([new Account(accountNumber1, initialBalance1)]);
    expect(ledger.accounts).toHaveLength(1);
  });

  it('should process a transaction', () => {
    const ledger = new Ledger([
      new Account(accountNumber1, initialBalance1),
      new Account(accountNumber2, initialBalance2)
    ]);
    ledger.processTransaction({ from: accountNumber1, to: accountNumber2, amount: transferAmount });
    expect(ledger.accounts[0].getBalance()).toBe(initialBalance1 - transferAmount);
    expect(ledger.accounts[1].getBalance()).toBe(initialBalance2 + transferAmount);
  });

  it('should not process a transaction if the account is not found', () => {
    const ledger = new Ledger([new Account(accountNumber1, initialBalance1)]);
    expect(() =>
      ledger.processTransaction({ from: accountNumber2, to: accountNumber1, amount: transferAmount })
    ).toThrow(ledgerAccountNotFoundError);
  });

  it('should process multiple transactions', () => {
    const ledger = new Ledger([
      new Account(accountNumber1, initialBalance1),
      new Account(accountNumber2, initialBalance2)
    ]);
    ledger.processTransactions([
      { from: accountNumber1, to: accountNumber2, amount: transferAmount },
      { from: accountNumber1, to: accountNumber2, amount: transferAmount }
    ]);
    expect(ledger.accounts[0].getBalance()).toBe(initialBalance1 - 2 * transferAmount);
    expect(ledger.accounts[1].getBalance()).toBe(initialBalance2 + 2 * transferAmount);
  });
});
