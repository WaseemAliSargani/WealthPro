// src/Pages/RechargeOptions.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaDollarSign, FaChevronRight } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';
import bep20 from '../assets/Investment/bep20-usdt.webp';
import trc20 from '../assets/Investment/trc20-usdt.jpg';
import trx from '../assets/Investment/trx.webp';

const rechargeOptions = [
  { name: 'BEP20-USDT', icon: <img className='w-[30px]' src={bep20} alt="" /> },
  { name: 'TRC20-USDT', icon: <img className='w-[30px]' src={trc20} alt="" /> },
];

const RechargeOptions = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { amount, planName } = state || {};

  return (
    <div className="bg-black text-[#efc99d] h-screen p-4">
      <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">&lt;</button>
        <h2 className="text-xl font-bold mx-auto">Recharge</h2>
      </div>
      <div className="space-y-4">
        {rechargeOptions.map((option) => (
          <Link
            to={`/Recharge/${option.name}`}
            state={{ amount, planName }}
            key={option.name}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-xl text-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{option.icon}</div>
              <span>{option.name}</span>
            </div>
            <FaChevronRight className="text-[#efc99d80]" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RechargeOptions;