# Mable Banking Transfer System

A TypeScript application that processes CSV transactions between accounts, ensuring sequential processing and preventing negative balances.

## Usage

```
npm install       # Install dependencies
npm test          # Run tests
npm start         # Process mable_account_balances.csv and mable_transactions.csv
```

## Model Design

**Account**: Encapsulates balance and transaction operations (debit/credit). Validates amounts and enforces non-negative balance constraint. Stores balance as integer cents internally.

**Ledger**: Manages collection of accounts and processes transactions. Handles account lookup and orchestrates transfers between accounts.

**Transaction**: Simple data structure representing a transfer (from, to, amount).

**CSV Loader**: Utility functions to load CSV into memory.

**Processor**: Orchestrates the full flow - loads CSV data, creates ledger, processes transactions, returns final state.

Clean separation: CSV loading → Domain models → Business logic → Output

## Design Decisions

**Fail-fast processing**: Stops on first transaction error. Banking systems should be conservative - a failure indicates data issues and partial processing is risky.

**Money as integer cents**: Stored internally as cents to avoid floating-point precision errors, exposed as dollars at boundaries.

**Sequential processing**: Transactions processed in order since earlier transactions affect later ones (e.g., depleting funds).

**Simple CSV parsing**: Uses native string split instead of a library. The provided CSVs are well-formed (no quotes, commas in values), so a custom parser is simpler and has zero dependencies. Production code with untrusted CSVs would use a robust parser like `csv-parse`.

## Assumptions

- CSV files are well-formed
- Both accounts must exist before transfer
- No negative balances allowed
- Transactions are atomic (all-or-nothing)

## Future Improvements

- Return transaction results instead of throwing on error
- Logging/audit trail
- Better CSV validation and error messages
- CLI arguments for custom file paths