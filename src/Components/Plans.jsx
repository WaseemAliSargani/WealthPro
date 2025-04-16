// src/Components/Plans.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Silver',
    price: '$30',
    amount: 30,
    daily: '$1',
    color: 'bg-gradient-to-br from-gray-100 to-gray-200',
    textColor: 'text-gray-800',
    border: 'border-gray-200',
    badge: 'bg-gray-500',
  },
  {
    name: 'Golden',
    price: '$50',
    amount: 50,
    daily: '$2',
    color: 'bg-gradient-to-br from-amber-100 to-amber-200',
    textColor: 'text-amber-900',
    border: 'border-amber-200',
    badge: 'bg-amber-500',
  },
  {
    name: 'Diamond',
    price: '$80',
    amount: 80,
    daily: '$3.5',
    color: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
    textColor: 'text-indigo-900',
    border: 'border-indigo-200',
    badge: 'bg-indigo-500',
  },
];

const Plans = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    navigate('/Recharge', { state: { amount: plan.amount, planName: plan.name } });
  };

  return (
    <div className="min-h-screen bg-[#1e1f23] rounded-3xl py-16 px-4 mb-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-400">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-300/70 max-w-2xl mx-auto">
            Unlock premium features and maximize your earnings with our tailored membership plans
          </p>
          <h1 className='mt-6 text-xl font-extrabold  text-[rgb(207,204,195)] tracking-[5px]'>Life Changing Oppertunity</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl ${plan.color} ${plan.textColor} p-4 md:p-6 shadow-lg hover:shadow-xl 
                transform transition-all duration-300 hover:-translate-y-2 border ${plan.border} flex flex-col cursor-pointer`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badge} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                {plan.name}
              </div>
              <div className="text-center pt-6 pb-4">
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <div className="text-lg font-medium opacity-80">Total Investment</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-xl p-4 mb-6">
                <div className="text-2xl font-semibold text-center">{plan.daily}</div>
                <div className="text-sm opacity-80 text-center">Daily Earnings</div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full"></span>
                  Premium Features
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full"></span>
                  Deposit bonus<span className='font-bold'>$5</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full"></span>
                  24/7 Support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full"></span>
                  Instant Access
                </li>
              </ul>
              <button
                className="mt-auto w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md"
              >
               Buy now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;