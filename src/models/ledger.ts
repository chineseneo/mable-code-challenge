import Account from "./account";
import { Transaction } from "./transaction";

export default class Ledger {
  constructor(public readonly accounts: Account[]) {}

  processTransactions(transactions: Transaction[]): void {
    for (const transaction of transactions) {
      try {
        console.log(
          `[INFO] Processing transaction: from=${transaction.from}, to=${transaction.to}, amount=${transaction.amount}`
        );
        this.processTransaction(transaction);
        console.log(
          `[SUCCESS] Transaction processed: from=${transaction.from}, to=${transaction.to}, amount=${transaction.amount}`
        );
      } catch (error: any) {
        console.error(
          `[ERROR] Failed to process transaction: from=${transaction.from}, to=${transaction.to}, amount=${transaction.amount} :: ${error.message}`
        );
        throw error; // Maintain fail-fast behaviour
      }
    }
  }
  
  private processTransaction(transaction: Transaction): void {
    const fromAccount = this.findAccountByNumber(transaction.from);
    const toAccount = this.findAccountByNumber(transaction.to);
    if (!fromAccount || !toAccount) {
      console.error(
        `[ERROR] One or both accounts not found: from=${transaction.from}, to=${transaction.to}`
      );
      throw new Error('Account not found');
    }
    if (fromAccount === toAccount) {
      console.error(
        `[ERROR] Attempted transfer to self: account=${transaction.from}`
      );
      throw new Error('From and to accounts cannot be the same');
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
