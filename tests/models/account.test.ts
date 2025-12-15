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
    expect(account.hasSameAccountNumber(accountNumber)).toBe(true);
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

  it('should not debit an account if the amount is less than 0', () => {
    const account = new Account(accountNumber, initialBalance);
    expect(() => account.debit(0)).toThrow('Amount must be greater than 0');
  });

  it('should not credit an account if the amount is less than 0', () => {
    const account = new Account(accountNumber, initialBalance);
    expect(() => account.credit(0)).toThrow('Amount must be greater than 0');
  });
});
