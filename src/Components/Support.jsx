import React from 'react';
import HomeNav from './HomeNav';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

const Support = () => {
  // Social media links
  const whatsappLink = 'https://whatsapp.com/channel/0029VbAG4lXLSmbjmUAVyr3C';
  const telegramLink = '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-[#efc99d] px-4 py-8 md:px-8 lg:px-16">
      <HomeNav />

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center mt-16 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-300 max-w-2xl">
          Join our community on WhatsApp or Telegram for updates, support, help and more!
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-3xl mx-auto">
        {/* WhatsApp Card */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full md:w-80 bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:bg-gray-700/70 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaWhatsapp className="text-4xl text-green-500" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-[#efc99d]">WhatsApp</h3>
            <p className="text-sm text-gray-400">Join our WhatsApp Channel</p>
          </div>
        </a>

        {/* Telegram Card */}
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full md:w-80 bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:bg-gray-700/70 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaTelegram className="text-4xl text-blue-500" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-[#efc99d]">Telegram</h3>
            <p className="text-sm text-gray-400">Feel Free to contact us - use VPN</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Support;
