import React from 'react';

interface WalletConnectProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({ isConnected, address, onConnect, onDisconnect }: WalletConnectProps) {
  if (!isConnected) {
    return (
      <button
        onClick={onConnect}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Connected Address: {address}
      </p>
      <button
        onClick={onDisconnect}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Disconnect
      </button>
    </div>
  );
}