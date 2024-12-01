import React from 'react';
import SideBar from '../components/sidebar';
import Header from '../components/header';
import SubscriptionChart from "../components/charts/subscriptionChart"
import { useStarknet } from '../hooks/useStarknet';
import TableOrders from '../components/table';
import {payments, columns} from "@/frontend/constants/categories"


const paymentsData = [
    { status: 'Success', email: 'ken99@yahoo.com', amount: 316.00 },
    { status: 'Success', email: 'abe45@gmail.com', amount: 242.00 },
    { status: 'Processing', email: 'monserrat44@gmail.com', amount: 837.00 },
    { status: 'Failed', email: 'carmella@hotmail.com', amount: 721.00 },
];

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]


const Profile = () => {
    const { wallet, balance, connectWallet, disconnectWallet, checkBalance } = useStarknet();

          
    return(
            <div className='bg-[#faf8f7] w-full h-screen p-4'>
                <Header address={wallet?.selectedAddress} balance={balance}/>

                <div className='w-full flex flex-row gap-x-6'>
                    <div className='w-1/3'>
                        <SubscriptionChart type="Revenue" chartData={chartData} />
                        <SubscriptionChart type="Views" chartData={chartData}/>
                    </div>
                    <div className='bg-white p-4 rounded-lg shadow mb-4 w-2/3'>
                        <h3>Order History</h3>
                        <TableOrders data={paymentsData} />
                    </div>
                </div>
              
            </div>
    );
};

export default Profile;

/** 
<div className="w-1/4 bg-gray-100 p-4">
<h2 className="text-lg font-bold">Portfolio Manager</h2>
<ul className="mt-4">
  <li className="py-2">All Patents</li>
  <li className="py-2">Statistics</li>
  <li className="py-2">Orders</li>
  <li className="py-2">Messages</li>
  <li className="py-2">Payments</li>
  <li className="py-2">Settings</li>
</ul>
</div>

<div className="flex-1 p-4">
<h1 className="text-2xl font-bold">Welcome back, David</h1>
<p className="mt-2">10 sales | 7 active listings</p>

<div className="mt-6 bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold">Total Revenue</h2>
  <p className="text-2xl">$15,231.89</p>
  <p className="text-sm text-gray-500">+20.1% from last month</p>
</div>

<div className="mt-6 bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold">Payments</h2>
  <p className="mt-2">Manage your payments.</p>
  <div className="mt-4">
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border p-2">Status</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2">Success</td>
          <td className="border p-2">ken99@yahoo.com</td>
          <td className="border p-2">$316.00</td>
        </tr>
        <tr>
          <td className="border p-2">Success</td>
          <td className="border p-2">abe45@gmail.com</td>
          <td className="border p-2">$242.00</td>
        </tr>
        <tr>
          <td className="border p-2">Processing</td>
          <td className="border p-2">monserrat44@gmail.com</td>
          <td className="border p-2">$837.00</td>
        </tr>
        <tr>
          <td className="border p-2">Failed</td>
          <td className="border p-2">carmella@hotmail.com</td>
          <td className="border p-2">$721.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
**/