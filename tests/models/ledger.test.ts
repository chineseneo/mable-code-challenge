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

  it('should not process a transaction if the from account is not found', () => {
    const ledger = new Ledger([new Account(accountNumber1, initialBalance1)]);
    expect(() =>
      ledger.processTransaction({ from: accountNumber2, to: accountNumber1, amount: transferAmount })
    ).toThrow(ledgerAccountNotFoundError);
  });

  it('should not process a transaction if the to account is not found', () => {
    const ledger = new Ledger([new Account(accountNumber1, initialBalance1)]);
    expect(() =>
      ledger.processTransaction({ from: accountNumber1, to: accountNumber2, amount: transferAmount })
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

  it('should process transactions in sequence where each depends on the previous', () => {
    // Setup: A has $100, B has $0, C has $0
    const ledger = new Ledger([
      new Account('A', 100),
      new Account('B', 0),
      new Account('C', 0)
    ]);

    ledger.processTransactions([
      { from: 'A', to: 'B', amount: 100 },  // A -> B: A now has $0, B has $100
      { from: 'B', to: 'C', amount: 50 },   // B -> C: B now has $50, C has $50
      { from: 'B', to: 'A', amount: 30 }    // B -> A: B now has $20, A has $30
    ]);

    expect(ledger.getAccounts()[0].getBalance()).toBe(30);  // A
    expect(ledger.getAccounts()[1].getBalance()).toBe(20);  // B
    expect(ledger.getAccounts()[2].getBalance()).toBe(50);  // C

    // If processed in different order, this would fail
    // e.g., if transaction 2 ran before transaction 1, B wouldn't have funds
  });
});
