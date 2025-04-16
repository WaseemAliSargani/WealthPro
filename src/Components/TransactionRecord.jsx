import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';
import { completeTask, getTransactions } from '../api';

const TransactionRecord = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      alert("Failed to load transactions: " + error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-black text-[#efc99d] px-4 pt-20 pb-12 min-h-screen">
      <div className="fixed w-[100%] md:w-[75%] lg:w-[58%] top-0 z-10 bg-black text-[#efc99d]">
        <div className="flex items-center mb-6 border-b border-gray-700 p-4">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">&lt;</button>
          <h2 className="text-xl font-bold mx-auto">Transaction Record</h2>
        </div>
      </div>
      
      <div className="bg-[#1e1f23] rounded-3xl py-2 mt-12">
        <HomeNav />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Your Transactions</h3>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx._id}
                className="bg-white py-4 rounded-2xl flex items-start justify-between mb-4 overflow-hidden"
              >
                <div className="px-2 md:px-4 text-black space-y-2 font-bold">
                  <div>Type:</div>
                  <div>Amount: </div>
                  <div>
                    {tx.address && <p>Address:</p>}
                  </div>
                  <div>
                    {tx.txid && <p>TXID:</p>}
                  </div>

                  <div className={`${tx.txid ? "pt-16 md:pt-8" : "pt-8 md:pt-2"}  `}>Date:  </div>
                  <div className='pt-12'>Status:</div>
                </div>
                <div className="px-4 text-black flex flex-col items-end space-y-1">
                  <div className='text-2xl font-bold text-black'>{tx.type}</div>
                  <div className="text-red-500 font-bold text-xl mt-12">
                    {tx.txid && <p className='text-green-600 font-bold'>${tx.amount} USDT</p>}
                    {tx.address && <p>-${tx.amount} USDT</p>}
                  </div>
                  <div className='md:text-sm break-all'>{tx.txid && <p>{tx.txid}</p>}</div>
                  <div className='md:text-sm break-all'>{tx.address && <p>{tx.address}</p>}</div>
                  <div>{new Date(tx.createdAt).toLocaleString()}</div>
                  <div className='pt-14'>
                    <div className="bg-gray-600 text-white px-2 py-1 rounded-lg font-medium">
                      {tx.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-[#efc99d80]">
              No transactions yet.
            </div>
          )}
          {/* {transactions.length > 0 ? (
            <ul className="space-y-4">
              {transactions.map((tx) => (
                <li key={tx._id} className="bg-white text-black p-4 rounded-lg">
                  <p>Type: {tx.type}</p>
                  <p>Amount: ${tx.amount}</p>
                  <p>Status: {tx.status}</p>
                  {tx.txid && <p>TXID: {tx.txid}</p>}
                  {tx.address && <p>Address: {tx.address}</p>}
                  <p>Date: {new Date(tx.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No transactions yet.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TransactionRecord;