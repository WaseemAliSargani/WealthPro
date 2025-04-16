// src/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? { email: user.email, password: user.password } : {};
};

export const signup = async (email, password, ref) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, ref }),
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Signup failed");
      } catch {
        throw new Error("Signup failed: Invalid response");
      }
    }
    const data = JSON.parse(text);
    localStorage.setItem("user", JSON.stringify({ email, password }));
    return data;
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Login failed");
      } catch {
        throw new Error("Login failed: Invalid response");
      }
    }
    const data = JSON.parse(text);
    localStorage.setItem("user", JSON.stringify({ email, password }));
    return data;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: { "Content-Type": "application/json", ...authHeaders() },
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Failed to fetch user");
      } catch {
        throw new Error("Failed to fetch user: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user");
  }
};

export const deposit = async (amount, txid, planName) => {
  try {
    const response = await fetch(`${API_URL}/transactions/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ amount, txid, planName }), // Include planName
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Deposit failed");
      } catch {
        throw new Error("Deposit failed: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Deposit failed");
  }
};

export const withdraw = async (amount, address, password) => {
  try {
    const response = await fetch(`${API_URL}/transactions/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ amount, address, password }),
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Withdraw failed");
      } catch {
        throw new Error("Withdraw failed: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Withdraw failed");
  }
};

export const activatePlan = async (plan, txid) => {
  try {
    const response = await fetch(`${API_URL}/users/activate-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ plan, txid }),
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Plan activation failed");
      } catch {
        throw new Error("Plan activation failed: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Plan activation failed");
  }
};

export const completeTask = async () => {
  try {
    const response = await fetch(`${API_URL}/users/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Task failed");
      } catch {
        throw new Error("Task failed: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Task failed");
  }
};

export const getTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: { "Content-Type": "application/json", ...authHeaders() },
    });
    const text = await response.text();
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Failed to fetch transactions");
      } catch {
        throw new Error("Failed to fetch transactions: Invalid response");
      }
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch transactions");
  }
};