import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaEnvelope } from 'react-icons/fa';

const HomeMessage = () => {
    return (
        <div className="w-full px-4 py-6 bg-gradient-to-b">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl px-6 py-4 flex items-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <FaEnvelope className="text-amber-400 text-2xl mr-5 animate-pulse" />
                    <Marquee
                        speed={60}
                        gradient={false}
                        pauseOnHover={true}
                        pauseOnClick={true}
                        className="text-white font-sans text-lg tracking-wide"
                        loop={0}
                    >
                        <span className="mx-4">
                            Elevate Your Wealth Creation Journey with Our Premier Investment Platform
                        </span>
                        <span className="mx-4">
                            Secure Your Financial Future with Trusted Expertise and Innovation
                        </span>
                        <span className="mx-4">
                            Partner with Us to Achieve Unparalleled Financial Success
                        </span>
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default HomeMessage;