import React from 'react'


// Need Integrate
const Header = ({address, balance}: {address: string, balance: string}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h1 className="text-2xl font-bold">Welcome back, </h1>
            <p className="mt-2 font-semibold">Balance</p>
            <p className="">{balance} ETH</p>
            <p className="mt-2 font-semibold">Wallet Address</p>
            <p className="">{address}</p>

          
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold">TOTAL VIEWS</h2>
                    <p className="text-2xl">487</p>
                    <p className="text-green-500">↑ 400%</p>
                    <p className="text-sm text-gray-500">Update: Today</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold">VISITS</h2>
                    <p className="text-2xl">260</p>
                    <p className="text-green-500">↑ 233%</p>
                    <p className="text-sm text-gray-500">Update: Today</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold">ORDERS</h2>
                    <p className="text-2xl">6</p>
                    <p className="text-green-500">↑ 19%</p>
                    <p className="text-sm text-gray-500">Update: Today</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold">REVENUE</h2>
                    <p className="text-2xl">CA$315</p>
                    <p className="text-green-500">↑ 20%</p>
                    <p className="text-sm text-gray-500">Update: Today</p>
                </div>
            </div>
        </div>
    )
}

export default Header
