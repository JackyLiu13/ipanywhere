export const TOKEN_ABI = [
  {
    members: [
      {
        name: "from",
        offset: 0,
        type: "felt"
      },
      {
        name: "to",
        offset: 1,
        type: "felt"
      },
      {
        name: "value",
        offset: 2,
        type: "Uint256"
      }
    ],
    name: "Transfer",
    size: 3,
    type: "event"
  },
  {
    inputs: [],
    name: "get_name",
    outputs: [
      {
        name: "name",
        type: "felt"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "get_symbol",
    outputs: [
      {
        name: "symbol",
        type: "felt"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "get_decimals",
    outputs: [
      {
        name: "decimals",
        type: "felt"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "get_total_supply",
    outputs: [
      {
        name: "total_supply",
        type: "Uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "account",
        type: "felt"
      }
    ],
    name: "balance_of",
    outputs: [
      {
        name: "balance",
        type: "Uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "recipient",
        type: "felt"
      },
      {
        name: "amount",
        type: "Uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "felt"
      }
    ],
    type: "function"
  }
];