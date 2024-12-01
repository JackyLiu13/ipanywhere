import React from 'react'

const Sell = () => {
  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-[50vw] h-[60vh] border-2 rounded-lg shadow-md text-center flex flex-col items-stretch">
        <h1 className="text-5xl font-thin mb-4 mt-64">Welcome back, Cynthia Hua</h1>
        <div className="mt-6 flex flex-col items-center gap-y-3">
          <a href='/sell/intake-form' className="bg-[#272D42] text-white font-light py-2  w-64 rounded-md">
            Upload New Patent
          </a>
          <a href='/profile' className="bg-[#272D42] text-white font-light py-2  w-64 rounded-md">
            View My Existing Patents
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sell
