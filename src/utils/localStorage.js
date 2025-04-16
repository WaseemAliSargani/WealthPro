export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const removeUser = () => {
  localStorage.removeItem("user");
};
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};