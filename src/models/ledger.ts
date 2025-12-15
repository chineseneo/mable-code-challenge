import Account from "./account";
import { Transaction } from "./transaction";

export default class Ledger {
  constructor(public readonly accounts: Account[]) {}

  processTransactions(transactions: Transaction[]): void {
    for (const transaction of transactions) {
      this.processTransaction(transaction);
    }
  }
  
  processTransaction(transaction: Transaction): void {
    const fromAccount = this.findAccountByNumber(transaction.from);
    const toAccount = this.findAccountByNumber(transaction.to);
    if (!fromAccount || !toAccount) {
      throw new Error('Account not found');
    }
    fromAccount.debit(transaction.amount);
    toAccount.credit(transaction.amount);
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  findAccountByNumber(accountNumber: string): Account | undefined {
    return this.accounts.find(account => account.hasSameAccountNumber(accountNumber));
  }

  toString(): string {
    return this.accounts.map(account => account.toString()).join('\n');
  }
}
