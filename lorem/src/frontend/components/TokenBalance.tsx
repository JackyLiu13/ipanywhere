import React from 'react';

interface TokenBalanceProps {
  balance: string;
  onCheckBalance: () => void;
}

export function TokenBalance({ balance, onCheckBalance }: TokenBalanceProps) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Balance: {balance}
      </p>
      <button
        onClick={onCheckBalance}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Check Balance
      </button>
    </div>
  );
}