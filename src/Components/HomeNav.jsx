import React from 'react'
// import image 
import HeroImg from '../assets/Investment/MainLogoURL.png'
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
    FaHandshake,
    FaGlobe,           // 🌐 Global
    FaEnvelope         // 💬 Message
} from 'react-icons/fa';

const HomeNav = () => {
    return (
        <nav className='md:w-[100%] lg:w-[100%] w-[100%] py-4'>
            <div className="container mx-auto">
                <div className='flex justify-between items-center'>
                    {/* item 1 */}
                    <div className='flex items-center font-medium'>
                        <img className='w-[60px] px-2 rounded-full' src={HeroImg} alt="" />
                        <h1>WealthPro</h1>
                    </div>
                    {/* item 2 */}
                    <div className='flex items-center justify-center gap-x-2'>
                        <div className='bg-[#ffffff33] p-[7px] rounded-full cursor-pointer'>
                            <FaGlobe className='text-[20px]' />
                        </div>
                        <div className='bg-[#ffffff33] p-[7px] rounded-full cursor-pointer'>
                            <FaEnvelope className='text-[20px]' />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HomeNav