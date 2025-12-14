import Account from '../../src/models/account';

const accountNumber = '1234567890';
const initialBalance = 1000;
const debitAmount = 500;
const creditAmount = 500;
const insufficientDebit = 1500;
const insufficientFundsError = 'Insufficient funds';

describe('Account', () => {
  it('should create an account', () => {
    const account = new Account(accountNumber, initialBalance);
    expect(account.accountNumber).toBe(accountNumber);
    expect(account.getBalance()).toBe(initialBalance);
  });

  it('should debit an account', () => {
    const account = new Account(accountNumber, initialBalance);
    account.debit(debitAmount);
    expect(account.getBalance()).toBe(initialBalance - debitAmount);
  });

  it('should credit an account', () => {
    const account = new Account(accountNumber, initialBalance);
    account.credit(creditAmount);
    expect(account.getBalance()).toBe(initialBalance + creditAmount);
  });

  it('should not debit an account if the balance is insufficient', () => {
    const account = new Account(accountNumber, initialBalance);
    expect(() => account.debit(insufficientDebit)).toThrow(insufficientFundsError);
  });
});