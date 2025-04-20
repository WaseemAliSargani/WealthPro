// src/Components/Task.jsx
import React, { useState, useEffect } from "react";
import HomeNav from "./HomeNav";
import bgimage from "../assets/Investment/BG.png";
import { completeTask, getUser } from "../api.js";

const Task = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasEarnedToday, setHasEarnedToday] = useState(false);
  const [activeTab, setActiveTab] = useState("inProgress");
  const [timeLeft, setTimeLeft] = useState("24:00:00");
  const [todayEarning, setTodayEarning] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [user, setUser] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      console.log('Task page - Fetched user data:', userData); // Debug log
      setUser(userData);
      const today = new Date().toDateString();
      const hasEarned = userData.lastTaskDate && new Date(userData.lastTaskDate).toDateString() === today;
      setHasEarnedToday(hasEarned);
      setRemainingTasks(userData.plan && !hasEarned ? 1 : 0);
      setTotalRevenue(userData.balance || 0);
      setCompletedTasks(userData.completedTasks || []);
      setTodayEarning(userData.todayEarning && userData.todayEarning.date === today ? userData.todayEarning.amount : 0);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      alert("Failed to load user data: " + error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    let interval = null;
    const updateTimer = () => {
      if (user?.lastTaskDate && hasEarnedToday) {
        const lastTask = new Date(user.lastTaskDate);
        const nextTask = new Date(lastTask.getTime() + 24 * 60 * 60 * 1000);
        const diff = nextTask - new Date();
        if (diff <= 0) {
          setHasEarnedToday(false);
          setRemainingTasks(user.plan ? 1 : 0);
          setTimeLeft("24:00:00");
          setTodayEarning(0);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }
      }
    };

    if (user) {
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(interval);
  }, [user, hasEarnedToday]);

  const handleEarnClick = async () => {
    if (!user?.plan) {
      alert("Please activate a plan.");
      return;
    }
    if (hasEarnedToday || remainingTasks === 0) {
      alert("Please wait until tomorrow.");
      return;
    }
    setIsProcessing(true);
    try {
      console.log('Task - Attempting to complete task for user:', user.email); // Debug log
      const response = await completeTask();
      console.log('Task - Response:', response); // Debug log
      setTodayEarning(response.todayEarning.amount);
      setTotalRevenue(response.balance);
      setHasEarnedToday(true);
      setRemainingTasks(0);
      setCompletedTasks(response.completedTasks || []);
      await fetchUserData();
      alert('Task completed successfully!');
    } catch (error) {
      console.error("Task error:", error.message);
      alert(`Failed to complete task: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTaskDetails = () => {
    switch (user?.plan) {
      case "Silver":
        return { earnings: "$1", amount: 1 };
      case "Golden":
        return { earnings: "$2", amount: 2 };
      case "Diamond":
        return { earnings: "$3.5", amount: 3.5 };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen mb-12 bg-gradient-to-br from-gray-900 to-black text-[#efc99d] px-4 py-6">
      <HomeNav />
      <div className="bg-yellow-400 text-black mt-12 p-8 rounded-3xl mb-8">
        <div className="flex flex-col md:flex-row gap-y-6 justify-between items-center">
          <div className="flex flex-col items-center justify-center border-b border-gray-600 w-full pb-4 lg:pb-0 lg:border-none">
            <div className="text-xl mb-3 font-bold">Current Plan</div>
            <div className="font-medium">{user?.plan || "None"}</div>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-gray-600 w-full pb-4 lg:pb-0 lg:border-none">
            <div className="text-xl mb-3 font-bold">Remaining Task</div>
            <div className="font-medium">{remainingTasks}</div>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-gray-600 w-full pb-4 lg:pb-0 lg:border-none">
            <div className="text-xl mb-3 font-bold">Today Earning</div>
            <div className="font-medium">${todayEarning}</div>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-gray-600 w-full pb-4 lg:pb-0 lg:border-none">
            <div className="text-xl mb-3 font-bold">Total Revenue</div>
            <div className="font-medium">${totalRevenue}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-4 px-4 mb-8">
        <h1 className="text-xl">Earning Time</h1>
        <p className="font-medium text-2xl text-red-500">{timeLeft}</p>
      </div>
      <div className="flex justify-center items-center py-8 mb-8 border-b border-gray-500">
        <img src={bgimage} width={350} alt="Background" />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("inProgress")}
            className={`relative px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
              activeTab === "inProgress"
                ? "bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            <span className="relative z-10">In Progress</span>
            {activeTab === "inProgress" && (
              <span className="absolute inset-0 rounded-lg border-2 border-[#efc99d]/70 shadow-[#efc99d]/30"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`relative px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-[#efc99d] to-[#d4a373] text-black shadow-lg"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            <span className="relative z-10">Completed</span>
            {activeTab === "completed" && (
              <span className="absolute inset-0 rounded-lg border-2 border-[#efc99d]/70 shadow-[#efc99d]/30"></span>
            )}
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          {activeTab === "inProgress" ? (
            <div className="text-center">
              {!hasEarnedToday && remainingTasks > 0 && getTaskDetails() ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#efc99d] mb-2">
                      Daily Task
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Complete a simple daily action
                    </p>
                    <p className="text-green-400 font-semibold">
                      Potential Earnings: {getTaskDetails().earnings}
                    </p>
                  </div>
                  <button
                    onClick={handleEarnClick}
                    disabled={isProcessing}
                    className={`relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden group ${
                      isProcessing
                        ? "cursor-not-allowed bg-gray-600"
                        : "cursor-pointer"
                    }`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#efc99d] to-[#d4a373] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin h-6 w-6 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span className="group-hover:scale-105 transition-transform duration-300">
                            Earn Now
                          </span>
                          <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                            💰
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 text-lg">
                  {user?.plan
                    ? "Please wait until tomorrow."
                    : "Please activate a plan."}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              {completedTasks.length > 0 ? (
                <ul className="space-y-4">
                  {completedTasks.map((task, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-4 rounded-lg"
                    >
                      <p>
                        Earned ${task.amount} with {task.plan} plan
                      </p>
                      <p className="text-gray-400 text-sm">
                        Completed on: {new Date(task.date).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-lg">No completed tasks yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;