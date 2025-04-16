// src/Components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Api";
import { saveUser } from "../Utils/LocalStorage";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [loginType, setLoginType] = useState("email");
  const [formData, setFormData] = useState({ email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = loginType === "email" ? { email: formData.email, password: formData.password } : { email: formData.phone, password: formData.password };
      const response = await login(credentials.email, credentials.password);
      saveUser({ ...response, email: credentials.email, password: credentials.password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="md:w-[77%] lg:w-[60%] w-[100vw] h-auto mx-auto bg-black text-[#efc99d] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center mb-6">
          <button className={`px-4 py-2 font-semibold ${loginType === "email" ? "border-b-2 border-[#efc99d]" : ""}`} onClick={() => setLoginType("email")}>
            Email Login
          </button>
          <button className={`px-4 py-2 font-semibold ${loginType === "phone" ? "border-b-2 border-[#efc99d]" : ""}`} onClick={() => setLoginType("phone")}>
            Phone Login
          </button>
        </div>
        {loginType === "email" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#efc99d]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="w-full py-2 bg-[#efc99d] text-black font-semibold rounded hover:bg-[#d4a874]">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handlePhoneInput}
                pattern="[0-9]*"
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
              <p className="text-sm text-gray-400 mt-1">Please enter only numbers (e.g., 1234567890).</p>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#efc99d]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="w-full py-2 bg-[#efc99d] text-black font-semibold rounded hover:bg-[#d4a874]">
              Login
            </button>
          </form>
        )}
        <p className="mt-4 text-center">
          No Account? <Link to="/signup" className="underline hover:text-[#d4a874]">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;