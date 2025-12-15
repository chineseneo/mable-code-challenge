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
      throw new Error('Insufficient funds');
    }
    this.balanceInCents -= amountInCents;
  }

  credit(amount: number): void {
    const amountInCents = amount * this.CENTS_PER_DOLLAR;
    this.validateAmount(amountInCents);
    this.balanceInCents += amountInCents;
  }

  getBalance(): number {
    return this.balanceInCents / this.CENTS_PER_DOLLAR;
  }

  toString(): string {
    return `${this.accountNumber},${this.getBalance()}`;
  }

  hasSameAccountNumber(accountNumber: string): boolean {
    return this.accountNumber === accountNumber;
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }
}
