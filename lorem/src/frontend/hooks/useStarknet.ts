import { useState, useEffect } from 'react';
import { connect, disconnect } from 'get-starknet';
import { Contract, Provider } from 'starknet';
import { TOKEN_ABI } from '../constants/contractAbi';
import { NETWORK_CONFIG, CONTRACT_ADDRESS } from '../config/network';

export function useStarknet() {
  const [wallet, setWallet] = useState<any>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [balance, setBalance] = useState<string>('0');

  const provider = new Provider(NETWORK_CONFIG.provider);

  // Load wallet from localStorage on initial load
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  useEffect(() => {
    if (wallet && CONTRACT_ADDRESS) {
      const contract = new Contract(
        TOKEN_ABI,
        CONTRACT_ADDRESS,
        provider
      );
      setContract(contract);
    }
  }, [wallet]);

  const connectWallet = async () => {
    try {
      const starknet = await connect();
      if (starknet) {
        setWallet(starknet);
        localStorage.setItem('wallet', JSON.stringify(starknet)); // Save wallet to localStorage
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setWallet(null);
    setContract(null);
    localStorage.removeItem('wallet'); // Remove wallet from localStorage
  };

  const checkBalance = async () => {
    if (contract && wallet?.selectedAddress) {
      try {
        const balance = await contract.balance_of(wallet.selectedAddress);
        setBalance(balance.toString());
      } catch (error) {
        console.error('Error checking balance:', error);
      }
    }
  };

  return {
    wallet,
    balance,
    connectWallet,
    disconnectWallet,
    checkBalance
  };
}