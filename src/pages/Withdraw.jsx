// src/Pages/Withdraw.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImg from '../assets/Blog/hero.webp';
import {
  FaHome,
  FaClipboardList,
  FaUserPlus,
  FaUserCircle,
  FaWallet,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaUsers,
  FaDownload,
  FaGift,
  FaHistory,
  FaHandshake,
  FaGlobe,
  FaEnvelope,
} from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { withdraw, getUser, getTransactions } from '../Api';

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchUserData = async () => {
    try {
      const user = await getUser();
      console.log('Withdraw page - Fetched balance:', user.balance);
      setBalance(user.balance || 0);

      const transactions = await getTransactions();
      console.log('Withdraw page - Fetched transactions:', transactions);
      setWithdrawals(transactions.filter(tx => tx.type === 'withdraw'));
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to load data: " + error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleWithdraw = async () => {
    if (!amount || !address || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (address.includes('@gmail')) {
      alert('Write your Bep20-USDT address Email not Accept');
      return;
    }

    const withdrawalAmount = parseFloat(amount);
    if (withdrawalAmount < 30 || withdrawalAmount > 10000) {
      alert('Mininum Withdrawal amount $30 - $10,000 USDT');
      return;
    }

    if (withdrawalAmount > balance) {
      alert('Insufficient balance for this withdrawal');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Withdraw attempt:', { amount: withdrawalAmount, address });
      await withdraw(withdrawalAmount, address, password);
      alert('Withdrawal requested successfully - Never Withdraw if already in pending otherwise fund not Receive');
      setAmount('');
      setAddress('');
      setPassword('');
      await fetchUserData();
      console.log('Withdraw page - Balance after withdrawal:', balance - withdrawalAmount);
    } catch (error) {
      console.error("Withdrawal error:", error.message);
      alert('Withdrawal failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black text-[#efc99d] pt-2 pb-20 w-full">
      <div className="flex items-center mb-6 border-b border-gray-700 p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">
          &lt;
        </button>
        <h2 className="text-xl font-bold mx-auto">Withdraw</h2>
      </div>
      <div className="bg-[#1e1f23] rounded-3xl w-full">
        <nav className="md:w-[100%] lg:w-[100%] w-[100vw] md:py-3 md:px-3 py-1 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center font-medium">
                <img className="w-[45px]" src={HeroImg} alt="" />
                <h1>PK Company</h1>
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <div className="relative group bg-[#ffffff33] p-[7px] rounded-full cursor-pointer">
                  <HiOutlineDocumentReport className="text-[20px]" />
                  <span className="absolute bottom-1/2 -left-16 -translate-x-1/2 bg-[#efc99d] text-black text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Financial Record
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-black rounded-3xl mx-4 py-6 px-4 mb-8">
          <div>
            <div className="mb-6">
              <p className="text-lg">Withdrawable</p>
              <h1 className="text-3xl text-[#f9b44b] font-bold">
                {balance.toFixed(2)}{' '}
                <span className="text-lg text-[#efc99d] font-normal">USDT</span>
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[#efc99d80]">Amount to be processed</div>
              <div>0 USDT</div>
            </div>
          </div>
        </div>
        <div className='text-[rgba(255,0,0)] text-center mb-4 font-medium tracking-wider'>Never Withdraw if already in pending otherwise Payment not Receive</div>
        <div className="px-6 mb-6">
          <div className="text-lg mb-3">Payment method</div>
          <button className="px-4 py-2 rounded-2xl bg-[#efc99d] text-black">
            BEP20-USDT
          </button>
        </div>
        <div className="w-full px-6 flex flex-col gap-y-4 mb-2">
          <input
            className="bg-black w-full px-3 py-4 border border-[#efc99d] text-[#efc99d] placeholder:text-[#efc99d90] rounded-2xl text-lg"
            placeholder="Enter Withdraw Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isProcessing}
          />
          <div>
            <p className="text-red-500 text-sm mb-2">
              Warning: Please double-check your withdrawal address. Funds sent to an incorrect address cannot be recovered.
            </p>
            <input
              className="bg-black w-full px-3 py-4 border border-[#efc99d] text-[#efc99d] placeholder:text-[#efc99d90] rounded-2xl text-lg"
              placeholder="Withdrawal Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          <input
            className="bg-black w-full px-3 py-4 border border-[#efc99d] text-[#efc99d] placeholder:text-[#efc99d90] rounded-2xl text-lg"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        <div className="px-8 text-[#efc99d80] mb-8">
          <div className="flex justify-between items-center mb-3">
            <div>Handling Fee</div>
            <div className="flex flex-col items-end">
              <div className="line-through">0 USDT</div>
              <div>Number of remaining fee-free withdrawals 1</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>Receipt</div>
            <div className="text-[#4ade80]">0 USDT</div>
          </div>
        </div>
        <div className="px-8 mb-4">
          <button
            onClick={handleWithdraw}
            className={`w-full bg-[#efc99d] text-black mb-4 py-4 rounded-full ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
      <div className="bg-[#1e1f23] rounded-3xl w-full p-6">
        <div className="mb-6 text-2xl border-b border-gray-600 pb-2 font-bold">
          History
        </div>
        {withdrawals.length > 0 ? (
          withdrawals.map((withdrawal) => (
            <div
              key={withdrawal._id}
              className="bg-white py-4 rounded-2xl flex items-start justify-between mb-4"
            >
              <div className="px-4 text-black">
                <div className="font-medium">
                  Withdraw USDT ({withdrawal.network || 'BEP20-USDT'})
                </div>
                <div>{new Date(withdrawal.createdAt).toLocaleString()}</div>
                <div className="text-sm text-gray-600 break-all">
                  Address: {withdrawal.address}
                </div>
              </div>
              <div className="px-4 text-black flex flex-col items-end">
                <div className="text-red-500 font-bold text-xl mb-1">
                  -{withdrawal.amount} USDT
                </div>
                <div className="bg-gray-500 text-white px-2 py-1 rounded-lg">
                  {withdrawal.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[#efc99d80]">
            No withdrawal history available
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;