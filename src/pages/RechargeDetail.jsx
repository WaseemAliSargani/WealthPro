import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import HomeNav from '../Components/HomeNav';
import { FaDollarSign } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';
import { deposit, getUser } from '../api';
import bep20 from '../assets/Investment/bep20-usdt.webp';
import trc20 from '../assets/Investment/trc20-usdt.jpg';
import trx from '../assets/Investment/trx.webp';
import QRCode from '../assets/Investment/QR.png';
import img1 from '../assets/Investment/bep20QR.jpg'
import img2 from '../assets/Investment/trc20QR.jpg'
import { AiOutlineCheck } from 'react-icons/ai';

const RechargeDetail = () => {
  const [txid, setTxid] = useState('');
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { amount, planName } = state || {};

  const addressMap = [
    { name: 'BEP20-USDT', icon: <img className="w-[30px]" src={bep20} alt="BEP20-USDT" />, address: '0x0d490d4172244fcc49362b76b290bda7be3fc868', QRAdress: img1 },

    { name: 'TRC20-USDT', icon: <img className="w-[30px]" src={trc20} alt="TRC20-USDT" />, address: 'TB6uQi1FqDYan4eqadhR7ESh8X1djN6ACL', QRAdress: img2 },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleDeposit = async () => {
    if (!txid) {
      setPopupMessage("Please enter TXID");
      setShowPopup(true);
      return;
    }
    if (!amount) {
      setPopupMessage("No plan selected");
      setShowPopup(true);
      return;
    }
    try {
      setIsLoading(true);
      setShowPopup(true);
      setPopupMessage("Please wait...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Submit deposit with planName included
      await deposit(amount, txid, planName); // Pass planName to deposit
      setIsLoading(false);
      setPopupMessage(
        "Your Recharge is in process. Plan will activate after transaction approval (1-3 hours). Have a nice day!"
      );
      setTxid(''); // Clear the form
      setTimeout(() => {
        setShowPopup(false);
        navigate("/Me");
      }, 4000); // Reduced to 7 seconds for better UX
    } catch (error) {
      console.error("Deposit error:", error);
      setIsLoading(false);
      setPopupMessage(error.message || "Failed to submit deposit");
      setShowPopup(true);
    }
  };

  const selected = addressMap.find((item) => item.name === type);

  return (
    <div className="bg-black wf text-[#efc99d] px-4 pt-20 pb-8">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-xl text-center w-[90%] max-w-lg">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <p className="text-black text-lg mb-4">Please wait...</p>
                <div className="w-8 h-8 border-4 border-t-[#efc99d] border-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div>
                {popupMessage.includes("Your Recharge is in process") ? (
                  <div>
                    <div className="text-lg font-semibold flex flex-col items-center justify-center">
                      <span className="mr-2 text-[70px] text-green-500 border border-green-300 p-2 rounded-full font-bold mt-4">
                        <AiOutlineCheck />
                      </span>
                      <div className="text-4xl mt-12 mb-4 text-black font-bold">Successful</div>
                      <div className="text-black text-lg font-medium mb-2">{popupMessage}</div>
                    </div>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-black text-lg">{popupMessage}</p>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="mt-4 bg-[#efc99d] text-black px-4 py-2 rounded-full"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed w-[100%] md:w-[75%] lg:w-[58%] top-0 z-10 bg-black text-[#efc99d]">
        <div className="flex items-center mb-6 border-b border-gray-700 p-4">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">&lt;</button>
          <h2 className="text-xl font-bold mx-auto">Recharge</h2>
        </div>
      </div>
      <div className="bg-[#1e1f23] rounded-3xl p-4">
        <HomeNav />
        {selected ? (
          <div className="p-4 rounded-xl text-center mb-4">
            <div className="flex items-center justify-center gap-x-2 text-[#efc99d] mb-4">
              <div className="flex justify-center mb-2">{selected.icon}</div>
              <div className="flex justify-center mb-2 font-bold">{selected.name}</div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <img className="rounded-lg w-[210px] md:w-[250px]" src={selected.QRAdress} alt="" />
            </div>
            <p className="text-xl text-[#efc99d] mb-6 font-bold">Recharge Address</p>
            <div className="bg-black rounded-xl flex flex-col md:flex-row items-center justify-between px-4 gap-x-4 text-[#efc99d] border border-[#efc99d] py-2 mb-8">
              <p className="text-lg break-all text-gray-200 tracking-wider">{selected.address}</p>
              <button
                onClick={() => navigator.clipboard.writeText(selected.address)}
                className="px-4 py-1 bg-[#efc99d] text-black rounded-full w-full md:w-min mt-4 md:mt-0"
              >
                Copy
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl flex flex-col md:flex-row items-center justify-between px-4 text-white border border-[#efc99d] py-4 cursor-pointer lg:gap-x-4 gap-y-4 lg:gap-y-0">
              <input
                className="w-full py-2 rounded-xl px-2 text-black"
                type="text"
                placeholder="Enter your TXID"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
              />
              <button
                onClick={handleDeposit}
                className="bg-[#efc99d] text-black rounded-full md:w-[35%] w-full py-2"
              >
                Recharge Complete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400 py-6">Invalid Recharge Option</p>
        )}
      </div>
      <ul className="bg-[#1e1f23] rounded-3xl px-4 text-[#efc99d] space-y-2 py-6 mt-6 mb-14 pb-12">
        <li className="flex items-center gap-x-4">
          <h1 className="text-xl">1.</h1> Copy the address or scan the QR code and use the correct network.
        </li>
        <li className="flex items-center gap-x-4">
          <h1 className="text-xl">2.</h1> Paste your TXID for verification.
        </li>
        <li className="flex items-center gap-x-4">
          <h1 className="text-xl">3.</h1> Minimum deposit is {amount || 30} USDT.
        </li>
        <li className="flex items-center gap-x-4">
          <h1 className="text-xl">4.</h1> USDT received in 1–3 hours.
        </li>
        <li className="flex items-center gap-x-4">
          <h1 className="text-xl">5.</h1> If not received, contact support.
        </li>
      </ul>
    </div>
  );
};

export default RechargeDetail;