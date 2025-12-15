export default class Account {
  private readonly CENTS_PER_DOLLAR = 100;
  private balanceInCents: number;

  constructor(private readonly accountNumber: string, balance: number) {
    this.balanceInCents = balance * this.CENTS_PER_DOLLAR;
  }
  
  debit(amount: number): void {
    const amountInCents = amount * this.CENTS_PER_DOLLAR;
    this.validateAmount(amountInCents);
    if (this.balanceInCents - amountInCents < 0) {
      console.error(`[ERROR] Insufficient funds: account=${this.accountNumber}, attemptedDebit=$${amount.toFixed(2)}, currentBalance=$${(this.getBalance()).toFixed(2)}`);
      throw new Error('Insufficient funds');
    }
    this.balanceInCents -= amountInCents;
    console.log(`[INFO] Debited $${amount.toFixed(2)} from account ${this.accountNumber}. New balance: $${this.getBalance().toFixed(2)}`);
  }

  credit(amount: number): void {
    const amountInCents = amount * this.CENTS_PER_DOLLAR;
    this.validateAmount(amountInCents);
    this.balanceInCents += amountInCents;
    console.log(`[INFO] Credited $${amount.toFixed(2)} to account ${this.accountNumber}. New balance: $${this.getBalance().toFixed(2)}`);
  }

  getBalance(): number {
    return this.balanceInCents / this.CENTS_PER_DOLLAR;
  }

  toString(): string {
    return `${this.accountNumber},${this.getBalance().toFixed(2)}`;
  }

  hasSameAccountNumber(accountNumber: string): boolean {
    return this.accountNumber === accountNumber;
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      console.error(`[ERROR] Invalid amount: account=${this.accountNumber}, amountInCents=${amount}`);
      throw new Error('Amount must be greater than 0');
    }
  }
}
