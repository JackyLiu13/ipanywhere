import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect } from 'get-starknet'; // Adjust the import based on your setup

interface AuthContextType {
  wallet: any;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  const connectWallet = async () => {
    try {
      const starknet = await connect();
      if (starknet) {
        setWallet(starknet);
        localStorage.setItem('wallet', JSON.stringify(starknet));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    localStorage.removeItem('wallet');
  };

  return (
    <AuthContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;