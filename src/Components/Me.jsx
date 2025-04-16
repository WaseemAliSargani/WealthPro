import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';
import { getUser } from '../Api';
import TransactionRecord from './TransactionRecord';
import { removeUser } from '../Utils/LocalStorage';
import { FaWallet, FaMoneyBillWave, FaReceipt, FaUserCircle } from 'react-icons/fa';

const Me = () => {
  const [activeOption, setActiveOption] = useState('commonProblem');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        alert("Please log in again: " + error.message);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleSignOut = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <>
      <HomeNav />
      <div className="w-full mt-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-x-4 mb-4">
            <FaUserCircle className="text-4xl" />
            <div className="flex flex-col text-base">
              <p>{user?.email || 'Loading...'}</p>
              <p>Plan - {user?.plan || 'None'}</p>
            </div>
          </div>
          <div className="container mx-auto w-full bg-[#1e1f23] rounded-3xl py-8 flex flex-col justify-between gap-y-4 px-4 mb-4">
            <div className="flex justify-between border-b border-black pb-4">
              <div className="text-[#efc99d80]">Total Assets (USDT)</div>
              <div className="text-2xl">{user?.balance || 0}</div>
            </div>
            <div className="flex justify-between border-b border-black pb-4">
              <div className="text-[#efc99d80]">Profit Assets (USDT)</div>
              <div className="text-2xl">{user?.balance || 0}</div>
            </div>
            <div className="flex justify-between border-b border-black pb-4">
              <div className="text-[#efc99d80]">Recharge Amount (USDT)</div>
              <div className="text-2xl">0</div>
            </div>
            <div className="flex items-center justify-between mt-6 px-8 md:px-20">
              <Link to="/Recharge" className="flex items-center justify-center flex-col gap-y-2">
                <div className="text-3xl border bg-black border-[#efc99d] p-2 rounded-full"><FaWallet /></div>
                <p>Recharge</p>
              </Link>
              <Link to="/withdraw" className="flex items-center justify-center flex-col gap-y-2">
                <div className="text-3xl border bg-black border-[#efc99d] p-2 rounded-full"><FaMoneyBillWave /></div>
                <p>Withdraw</p>
              </Link>
              <Link to="/TransactionRecord" className="flex items-center justify-center flex-col gap-y-2">
                <div className="text-3xl bg-black border border-[#efc99d] p-2 rounded-full"><FaReceipt /></div>
                <p>Record</p>
              </Link>
            </div>
          </div>
          <div className="bg-[#1e1f23] text-[#efc99d] px-4 py-6 rounded-3xl mb-8">
            <div className="max-w-3xl mx-auto mt-12">
              <div className="flex justify-center gap-2 md:gap-4 mb-8">
                <button onClick={() => setActiveOption('commonProblem')} className={`relative px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${activeOption === 'commonProblem' ? 'bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                  <span className="relative z-10">Common Problem</span>
                  {activeOption === 'commonProblem' && <span className="absolute inset-0 rounded-lg border-2 border-[#efc99d]/70 shadow-[#efc99d]/30"></span>}
                </button>
                <button onClick={() => setActiveOption('aboutUs')} className={`relative px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${activeOption === 'aboutUs' ? 'bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                  <span className="relative z-10">About Us</span>
                  {activeOption === 'aboutUs' && <span className="absolute inset-0 rounded-lg border-2 border-[#efc99d]/70 shadow-[#efc99d]/30"></span>}
                </button>
                <button onClick={() => setActiveOption('downloadApp')} className={`relative px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${activeOption === 'downloadApp' ? 'bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                  <span className="relative z-10">Download APP</span>
                  {activeOption === 'downloadApp' && <span className="absolute inset-0 rounded-lg border-2 border-[#efc99d]/70 shadow-[#efc99d]/30"></span>}
                </button>
              </div>
              <div className="p-6 rounded-xl">
                {activeOption === 'commonProblem' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Common Problems</h2>
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold mb-2">Plan Activation Time</h3>
                      <p className="text-gray-300">Your Plan will activate 1-5 hours afer confirmation your Txid</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold mb-2">How I can check my earnings?</h3>
                      <p className="text-gray-300">Check the Transaction in Record page. where you all Transactions Deposit/Withdraw</p>
                    </div>
                  </div>
                )}
                {activeOption === 'aboutUs' && (
                  <div>
                    <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-md">
                      <h1 className='text-xl mb-4 tracking-widest font-medium'>👋 Hello legends</h1>
                      <p className='text-gray-300 text-lg px-1 font-extralight tracking-wide'>Welcome to WealthPro, we make investing simple, smart, and secure for everyone. Whether you're just starting your financial journey or looking to grow your wealth,
                      </p>
                      <p className='text-gray-300 text-lg px-1 font-extralight tracking-wide'>WealthPro offers flexible investment plans designed to fit your goals and budget.Our mission is to provide an easy-to-use platform where your money works for you. With expert guidance, transparent policies, and real-time tracking, we help you invest with confidence.</p>
                    </div>
                  </div>
                )}
                {activeOption === 'downloadApp' && (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Download APP</h2>
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-md">
                      <p className="text-gray-300 mb-4">Cooming Soon!!</p>
                      <div className="flex justify-center gap-4">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="relative px-6 py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg hover:shadow-xl transition-all duration-300">
                          <span className="relative z-10">App Store</span>
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="relative px-6 py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg hover:shadow-xl transition-all duration-300">
                          <span className="relative z-10">Google Play</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pb-20 px-8">
            <div className="bg-[#efc99d] text-black w-full flex items-center justify-center rounded-full">
              <button onClick={handleSignOut} className="text-lg py-4 px-[20%]">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Me;