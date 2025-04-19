import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { getUser } from '../api';

const Invite = () => {
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setInvitationCode(userData.invitationCode);
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Please log in again');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleShare = (platform) => {
    const shareText = `Join me using my invite link: ${inviteLink}`;
    const encodedLink = encodeURIComponent(inviteLink);
    const encodedText = encodeURIComponent(shareText);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      instagram: null,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    };

    if (navigator.share && platform !== 'instagram' && platform !== 'whatsapp') {
      navigator
        .share({
          title: 'Invite Friends',
          text: shareText,
          url: inviteLink,
        })
        .catch((error) => console.error('Error sharing:', error));
    } else {
      const shareUrl = shareUrls[platform];
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      } else {
        handleCopy(inviteLink);
        alert('Instagram sharing is not supported directly. Link copied! Paste it in your Instagram post or story.');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-[#efc99d] py-10">Loading...</div>;
  }

  const inviteLink = `https://wealth-pro.vercel.app/signup?ref=${invitationCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-[#efc99d] px-4 py-6">
      <HomeNav />
      <div className="max-w-5xl mx-auto mt-8">
        {/* Invitation Section */}
        <div className="bg-[#1e1f23] rounded-3xl p-6 md:p-8 shadow-2xl mb-12 border border-[#efc99d]/20">
          <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#efc99d] to-[#d4a276]">
            Invite Friends & Earn Rewards
          </h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#efc99d]">Your Unique Code</h2>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-between px-4 py-3 border border-[#efc99d]/30 shadow-lg">
              <p className="text-gray-200 tracking-wider font-mono">{invitationCode}</p>
              <button
                onClick={() => handleCopy(invitationCode)}
                className="px-4 py-1 bg-gradient-to-r from-[#efc99d] to-[#d4a276] text-black rounded-full font-medium hover:from-[#e0b88a] hover:to-[#c99863] transition-all duration-300 shadow-md"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#efc99d]">Your Invite Link</h2>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl flex flex-col md:flex-row md:mt-0 items-center justify-between px-4 py-3 border border-[#efc99d]/30 shadow-lg gap-x-4">
              <p className="text-gray-200 tracking-wider font-mono break-all">{inviteLink}</p>
              <button
                onClick={() => handleCopy(inviteLink)}
                className="px-4 py-1 bg-gradient-to-r from-[#efc99d] to-[#d4a276] text-black rounded-full font-medium hover:from-[#e0b88a] hover:to-[#c99863] transition-all duration-300 shadow-md mt-6 md:mt-0 w-full md:w-min"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {[
              { Icon: FaFacebookF, platform: 'facebook', color: '#1877f2' },
              { Icon: FaTwitter, platform: 'twitter', color: '#1da1f2' },
              { Icon: FaInstagram, platform: 'instagram', color: '#e1306c' },
              { Icon: FaLinkedinIn, platform: 'linkedin', color: '#0a66c2' },
              { Icon: FaWhatsapp, platform: 'whatsapp', color: '#25D366' },
            ].map(({ Icon, platform, color }, index) => (
              <button
                key={index}
                onClick={() => handleShare(platform)}
                className="relative p-3 rounded-full border border-[#efc99d]/30 text-[#efc99d] hover:text-white transition-all duration-300 transform hover:scale-110 group"
                style={{ background: `radial-gradient(circle at center, ${color}20, #1e1f23)` }}
              >
                <Icon
                  size={20}
                  className="relative z-10 transition-colors duration-300 group-hover:text-white"
                />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
        {/* Enhanced Invitation Details Section */}
        <div className="bg-gradient-to-br from-[#25262b] to-[#1e1f23] rounded-3xl p-6 md:p-10 shadow-2xl text-white border border-[#efc99d]/10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-[#efc99d]">🎉</span> Invite & Earn
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Earn <span className="font-bold text-[#efc99d]">$5</span> for every friend who joins! Build your network, grow your rewards.
            </p>
          </div>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#efc99d] mb-4">💰 Rewards Await</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-200">
              {[
                { icon: '🔗', text: '$5 per friend deposit' },
                { icon: '📈', text: 'Unlimited earning potential' },
                { icon: '💎', text: 'Exclusive milestone bonuses' },
              ].map(({ icon, text }, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="text-[#efc99d] text-2xl">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#efc99d] mb-4">🚀 How It Works</h2>
            <div className="space-y-4">
              {[
                'Share your unique invite link',
                'Friends sign up with your link',
                'Earn $5 when they deposit',
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="w-10 h-10 bg-gradient-to-r from-[#efc99d] to belső[#d4a276] text-black rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-400">Withdraw or reinvest your earnings effortlessly!</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#efc99d] mb-4">🌟 Why Invite?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-200">
              {['Passive income', 'Trusted platform', 'Instant rewards', 'USDT earnings'].map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    <span className="text-green-400">✅</span> {item}
                  </div>
                )
              )}
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#efc99d] mb-4">📢 Pro Tips</h2>
            <ul className="space-y-3 text-gray-200 list-none">
              {[
                'Share on social media for max reach',
                'Create engaging video tutorials',
                'Post your success stories',
                'Build a referral chain',
              ].map((tip, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="text-[#efc99d]">➡️</span> {tip}
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#efc99d] mb-4">👥 Example</h2>
            <p className="text-gray-200">Invite 10 friends:</p>
            <p className="text-[#efc99d] font-semibold text-2xl">Earn $50 instantly!</p>
            <p className="text-gray-400">Your earnings grow as they invite others!</p>
          </section>
          <div className="text-center">
            <p className="text-lg text-gray-200 mb-4">🌍 Join the referral revolution</p>
            <Link to="/invite">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#efc99d] to-[#d4a276] text-black px-8 py-3 rounded-xl font-semibold hover:from-[#e0b88a] hover:to-[#c99863] transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Start Inviting Now 🎯
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-6">🔒 100% Transparent & Secure</p>
      </div>
    </div>
  );
};

export default Invite;