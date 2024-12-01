import React, { createContext, useContext } from 'react';
import { useStarknet } from './hooks/useStarknet';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarNoLogin from './components/Navbar-No-Login';


import Hero from './pages/hero';
import MarketPlace from './pages/marketPlace';
import Buy from './pages/buy';
import Sell from './pages/sell';
import Profile from './pages/profile';
import SellIntakeForm from './pages/sellIntakeForm';


function App() {
  const { wallet, balance, connectWallet, disconnectWallet, checkBalance } = useStarknet();
  const existingWallet = localStorage.getItem('wallet');

  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 z-50 w-full bg-[#e8f3ff] h-[10rem] py-3">
        {existingWallet
          ?
          <Navbar 
            disconnect={disconnectWallet}
          
          />
          :
          <NavbarNoLogin 
            onConnect={connectWallet}
          />
        }
      </div>

      {existingWallet
        ?
        <div className='mt-[10rem] border- border-orange-300 overflow-hidden overflow-y-hidden'>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/sell/intake-form" element={<SellIntakeForm />} />
            <Route path="/buy/:patentNumber" element={<Buy />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        :
        <div className='mt-[10rem]'>
          <Hero />
        </div>
      }

    </BrowserRouter>
  );
}

export default App;
