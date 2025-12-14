# Mable Back End Code Challenge

You are a developer for a company that runs a very simple banking service. Each
day companies provide you with a CSV file with transfers they want to make
between accounts for customers they are doing business with. Accounts are
identified by a 16 digit number and money cannot be transferred from them if it
will put the account balance below $0. Your job is to implement a simple system
that can load account balances for a single company and then accept a day's
transfers in a CSV file. An example customer balance file is provided as well
as an example days transfers.

eg [mable_account_balances.csv](./mable_account_balances.csv)

| Starting state of accounts for Account | customers of Alpha Sales: Balance |
|---------------------------------------:|----------------------------------:|
| 1111234522226789                       |                           5000.00 |
| 1111234522221234                       |                          10000.00 |
| 2222123433331212                       |                            550.00 |
| 1212343433335665                       |                           1200.00 |
| 3212343433335755                       |                          50000.00 |

Single day transactions for Alpha sales:

eg [mable_transactions.csv](./mable_transactions.csv)

| From             | To               | Amount  |
|-----------------:|-----------------:|--------:|
| 1111234522226789 | 1212343433335665 |  500.00 |
| 3212343433335755 | 2222123433331212 | 1000.00 |
| 3212343433335755 | 1111234522226789 |  320.50 |
| 1111234522221234 | 1212343433335665 |   25.60 |

## Rubrick

Data Structure
* [ ] uses domain models
* [ ] uses native data structures readably

## Tests

* [ ] uses rspec
* [ ] has some coverage
* [ ] has good coverage
* [ ] tests are orthogonal
* [ ] tests explain the functionality Object Orientation
* [ ] models encapsulate logic appropriately
* [ ] respects separation of concerns
* [ ] short methods
* [ ] readable methods General
* [ ] runs and provides feedback
* [ ] calculates test files accurately
