class Account {
    constructor(public readonly accountNumber: string, private balance: number) {}
    
    debit(amount: number): void {
      if (this.balance - amount < 0) {
        throw new Error('Insufficient funds');
      }
      this.balance -= amount;
    }
  
    credit(amount: number): void {
      this.balance += amount;
    }
  
    getBalance(): number {
      return this.balance;
    }
  }
  
  export default Account;