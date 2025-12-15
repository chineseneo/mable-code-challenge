export default class Account {
  constructor(public readonly accountNumber: string, private balance: number) {}
  
  debit(amount: number): void {
    this.validateAmount(amount);
    if (this.balance - amount < 0) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  credit(amount: number): void {
    this.validateAmount(amount);
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }

  toString(): string {
    return `${this.accountNumber},${this.balance}`;
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }
}
