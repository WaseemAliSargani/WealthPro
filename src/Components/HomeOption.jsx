import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {
    FaWallet,            // Recharge
    FaMoneyBillWave,     // Withdraw
    FaQuestionCircle,    // Help
    FaUsers,             // Team
    FaDownload,          // Download APP
    FaGift,              // Activity
    FaHandshake,         // Agent Cooperation
    FaUserPlus,          // Invite Friends
    FaUserCircle,         // Account
    FaRegCommentDots
} from 'react-icons/fa';

const HomeOption = () => {
    return (
        <div className=' w-full md:px-4 mb-6'>
            <div className="container mx-auto w-full bg-[#1e1f23] rounded-3xl px-20 py-8">
                <div className='grid grid-cols-3 gap-x-20 gap-y-12 flex-wrap'>
                    {/* 1 */}
                    <Link to={'/Recharge'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaWallet />
                        </div>
                        <p>Recharge</p>
                    </Link>

                    {/* 2 */}
                    <Link to={'/Withdraw'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaMoneyBillWave />
                        </div>
                        <p>Withdraw</p>
                    </Link>

                    {/* 3 */}
                    <Link to={'/Me'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaUserCircle />
                        </div>
                        <p>Account</p>
                    </Link>

                    {/* 4 */}
                    <Link to={'/Task'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaGift />
                        </div>
                        <p>Earn</p>
                    </Link>

                    {/* 5 */}
                    <Link to={'/Invite'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaUserPlus />
                        </div>
                        <p>Invite Friends</p>
                    </Link>

                    {/* 5 */}
                    <Link to={'/Support'} className='flex items-center justify-center flex-col gap-y-2'>
                        <div className='text-3xl bg-black/70 border border-[#efc99d] p-3 rounded-full'>
                            <FaRegCommentDots />
                        </div>
                        <p>Supoort</p>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default HomeOption
