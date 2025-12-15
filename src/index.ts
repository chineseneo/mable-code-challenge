import processTransactions from "./processor";

function main() {
  const ledger = processTransactions('mable_account_balances.csv', 'mable_transactions.csv');
  console.log(ledger.toString());
}

main();
