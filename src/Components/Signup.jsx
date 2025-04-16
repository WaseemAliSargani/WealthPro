// src/Components/Signup.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "../api";
import { saveUser } from "../Utils/LocalStorage";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [registerType, setRegisterType] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    ref: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref") || "";
    setFormData((prev) => ({ ...prev, ref }));
  }, [searchParams]);

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
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");
    try {
      const credentials = registerType === "email"
        ? { email: formData.email, password: formData.password }
        : { email: formData.phone, password: formData.password };
      const response = await signup(credentials.email, credentials.password, formData.ref);
      saveUser({ ...response, email: credentials.email, password: credentials.password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="md:w-[77%] lg:w-[60%] w-[100vw] h-auto mx-auto bg-black text-[#efc99d] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold ${registerType === "email" ? "border-b-2 border-[#efc99d]" : ""}`}
            onClick={() => setRegisterType("email")}
          >
            Email Register
          </button>
          <button
            className={`px-4 py-2 font-semibold ${registerType === "phone" ? "border-b-2 border-[#efc99d]" : ""}`}
            onClick={() => setRegisterType("phone")}
          >
            Phone Register
          </button>
        </div>
        {registerType === "email" ? (
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
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-[#efc99d]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <label htmlFor="ref" className="block text-sm">Referral Code (Optional)</label>
              <input
                type="text"
                name="ref"
                id="ref"
                value={formData.ref}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-[#efc99d] text-black font-semibold rounded hover:bg-[#d4a874]">
              Register
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
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-[#efc99d]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <label htmlFor="ref" className="block text-sm">Referral Code (Optional)</label>
              <input
                type="text"
                name="ref"
                id="ref"
                value={formData.ref}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-[#efc99d] rounded focus:outline-none focus:ring-2 focus:ring-[#efc99d]"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-[#efc99d] text-black font-semibold rounded hover:bg-[#d4a874]">
              Register
            </button>
          </form>
        )}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="underline hover:text-[#d4a874]">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;