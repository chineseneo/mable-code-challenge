import { loadAccountBalances, loadTransactions } from './utils/csv-loader';
import Ledger from './models/ledger';

export default function processTransactions(accountBalancesCsvFilePath: string, transactionsCsvFilePath: string): Ledger {
  const accountBalances = loadAccountBalances(accountBalancesCsvFilePath);
  const transactions = loadTransactions(transactionsCsvFilePath);
  const ledger = new Ledger(accountBalances);
  ledger.processTransactions(transactions);
  return ledger;
};
