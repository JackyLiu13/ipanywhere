# Starknet Smart Contract

This is a basic ERC-20 token implementation using Cairo 1.0 for Starknet. The contract includes:

- Basic token functionality (transfer, balances)
- Standard ERC-20 views (name, symbol, decimals, total supply)
- Events for transfers
- Test suite

## Prerequisites

- [Scarb](https://docs.swmansion.com/scarb/) - Cairo package manager and build tool

## Structure

- `src/lib.cairo`: Main token contract implementation
- `src/tests.cairo`: Test suite for the token contract
- `Scarb.toml`: Project configuration and dependencies

## Features

- Token name, symbol, and decimals
- Total supply tracking
- Balance tracking per address
- Transfer functionality
- Event emission
- Comprehensive test coverage

## Building

```bash
scarb build
```

## Testing

```bash
scarb test
```