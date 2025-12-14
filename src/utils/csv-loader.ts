import Account from "../models/account";
import fs from 'fs';
import { Transaction } from "../models/transaction";

export default class CsvLoader {
  loadAccountBalances(filePath: string): Account[] {
    return this.readCsv(filePath).map(this.parseAccount);
  }

  loadTransactions(filePath: string): Transaction[] {
    return this.readCsv(filePath).map(this.parseTransaction);
  }

  private validateFilePath(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${filePath} does not exist`);
    }
  }

  private readCsv(filePath: string): string[] {
    this.validateFilePath(filePath);
    const file = fs.openSync(filePath, 'r');
    try {   
      const csv = fs.readFileSync(file, 'utf8');
      return csv.split('\n').filter(row => row.length > 0);
    } catch (error) {
      throw new Error(`Error reading CSV file ${filePath}: ${error}`);
    } finally {
      fs.closeSync(file);
    }
  }

  private parseAccount(row: string): Account {
    const [accountNumber, balance] = row.split(',');
    return new Account(accountNumber, parseFloat(balance));
  }

  private parseTransaction(row: string): Transaction {
    const [from, to, amount] = row.split(',');
    return { from, to, amount: parseFloat(amount) };
  }
}
