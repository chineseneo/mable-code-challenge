import Account from "../models/account";
import fs from "fs";
import { Transaction } from "../models/transaction";

export const loadAccountBalances = (filePath: string): Account[] =>
  readCsv(filePath).map(parseAccount);

export const loadTransactions = (filePath: string): Transaction[] =>
  readCsv(filePath).map(parseTransaction);

const validateFilePath = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist`);
  }
};

const readCsv = (filePath: string): string[] => {
  validateFilePath(filePath);
  const file = fs.openSync(filePath, "r");
  try {
    const csv = fs.readFileSync(file, "utf8");
    if (!csv.includes("\n")) {
      throw new Error(`File ${filePath} is not a CSV`);
    }
    return csv.split("\n").filter((row) => row.length > 0);
  } catch (error) {
    throw new Error(`Error reading CSV file ${filePath}: ${error}`);
  } finally {
    fs.closeSync(file);
  }
};

const parseAccount = (row: string): Account => {
  const [accountNumber, balance] = row.split(",");
  return new Account(accountNumber, parseFloat(balance));
};

const parseTransaction = (row: string): Transaction => {
  const [from, to, amount] = row.split(",");
  return { from, to, amount: parseFloat(amount) };
};
