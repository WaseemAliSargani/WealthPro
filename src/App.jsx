import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import RechargeOptions from './pages/RechargeOptions';
import RechargeDetail from './pages/RechargeDetail';
import Task from './Components/Task';
import Invite from './Components/Invite';
import Me from './Components/Me';
import Withdraw from './pages/Withdraw';
import TransactionRecord from './Components/TransactionRecord';
import Signup from './Components/Signup'; // Added Signup import
import Support from './Components/Support';
import { FaHome, FaClipboardList, FaUserPlus, FaUserCircle } from 'react-icons/fa';
import ScrollToTop from './Components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <div className="md:w-[77%] lg:w-[60%] w-[100%] h-auto mx-auto bg-black text-[#efc99d]">
        <nav className="fixed bottom-0 overflow-hidden z-50 md:w-[77%] lg:w-[60%] w-[100vw] bg-[#313235]">
          <div className="container mx-auto flex justify-between items-center w-full h-[50px] md:px-20 px-8 mt-2">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'text-[#efc99d]' : 'text-[#efc99d80]')}>
              <div className="flex flex-col items-center justify-center text-sm gap-y-1">
                <FaHome className="text-xl" /> Home
              </div>
            </NavLink>
            <NavLink to="/Task" className={({ isActive }) => (isActive ? 'text-[#efc99d]' : 'text-[#efc99d80]')}>
              <div className="flex flex-col items-center justify-center text-sm gap-y-1">
                <FaClipboardList className="text-xl" /> Task
              </div>
            </NavLink>
            <NavLink to="/Invite" className={({ isActive }) => (isActive ? 'text-[#efc99d]' : 'text-[#efc99d80]')}>
              <div className="flex flex-col items-center justify-center text-sm gap-y-1">
                <FaUserPlus className="text-xl" /> Invite Friends
              </div>
            </NavLink>
            <NavLink to="/Me" className={({ isActive }) => (isActive ? 'text-[#efc99d]' : 'text-[#efc99d80]')}>
              <div className="flex flex-col items-center justify-center text-sm gap-y-1">
                <FaUserCircle className="text-xl" /> Me
              </div>
            </NavLink>
          </div>
        </nav>

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Recharge" element={<RechargeOptions />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Recharge/:type" element={<RechargeDetail />} />
          <Route path="/TransactionRecord" element={<TransactionRecord />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/Invite" element={<Invite />} />
          <Route path="/Me" element={<Me />} />
          <Route path="/signup" element={<Signup />} /> {/* Added Signup route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;