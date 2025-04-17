const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('Error: VITE_API_URL is not defined in .env');
}

const authHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? { email: user.email, password: user.password } : {};
};

export const signup = async (email, password, ref) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ref }),
    });
    const text = await response.text();
    console.log('Signup response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Signup failed: ${response.status}`);
      } catch {
        throw new Error(`Signup failed: Invalid response (status ${response.status})`);
      }
    }
    const data = JSON.parse(text);
    localStorage.setItem('user', JSON.stringify({ email, password }));
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Signup failed');
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const text = await response.text();
    console.log('Login response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Login failed: ${response.status}`);
      } catch {
        throw new Error(`Login failed: Invalid response (status ${response.status})`);
      }
    }
    const data = JSON.parse(text);
    localStorage.setItem('user', JSON.stringify({ email, password }));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    const text = await response.text();
    console.log('Get user response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Failed to fetch user: ${response.status}`);
      } catch {
        throw new Error(`Failed to fetch user: Invalid response (status ${response.status})`);
      }
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Get user error:', error);
    throw new Error(error.message || 'Failed to fetch user');
  }
};

export const deposit = async (amount, txid, planName) => {
  try {
    const response = await fetch(`${API_URL}/transactions/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ amount, txid, planName }),
    });
    const text = await response.text();
    console.log('Deposit response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Deposit failed: ${response.status}`);
      } catch {
        throw new Error(`Deposit failed: Invalid response (status ${response.status})`);
      }
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Deposit error:', error);
    throw new Error(error.message || 'Deposit failed');
  }
};

export const withdraw = async (amount, address, password) => {
  try {
    const response = await fetch(`${API_URL}/transactions/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ amount, address, password }),
    });
    const text = await response.text();
    console.log('Withdraw response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Withdraw failed: ${response.status}`);
      } catch {
        throw new Error(`Withdraw failed: Invalid response (status ${response.status})`);
      }
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Withdraw error:', error);
    throw new Error(error.message || 'Withdraw failed');
  }
};

export const completeTask = async () => {
  try {
    const response = await fetch(`${API_URL}/users/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    const text = await response.text();
    console.log('Task response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Task failed: ${response.status}`);
      } catch {
        throw new Error(`Task failed: Invalid response (status ${response.status})`);
      }
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Task error:', error);
    throw new Error(error.message || 'Task failed');
  }
};

export const getTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    const text = await response.text();
    console.log('Transactions response:', response.status, text);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || `Failed to fetch transactions: ${response.status}`);
      } catch {
        throw new Error(`Failed to fetch transactions: Invalid response (status ${response.status})`);
      }
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Transactions error:', error);
    throw new Error(error.message || 'Failed to fetch transactions');
  }
};